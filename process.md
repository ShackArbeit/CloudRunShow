# Deployment Process

這份文件說明目前這個專案，從本機修改程式碼到 GitHub，再到 GCP 自動建置並更新 Cloud Run 的完整流程。

## Overall Flow

```text
+--------------------+
| Local Repository   |
| - edit code        |
| - test locally     |
| - git commit       |
+---------+----------+
          |
          | git push origin main
          v
+--------------------+
| GitHub Repository  |
| ShackArbeit/       |
| CloudRunShow       |
+---------+----------+
          |
          | push event on main
          v
+--------------------+
| Cloud Build        |
| Trigger            |
| CloudRuntTrigger   |
+---------+----------+
          |
          | reads cloudbuild.yaml
          v
+--------------------+
| Build Step 1       |
| docker build       |
| using Dockerfile   |
+---------+----------+
          |
          | create image
          v
+--------------------+
| Build Step 2       |
| docker push        |
| commit-sha tag     |
+---------+----------+
          |
          | push image
          v
+--------------------+
| Artifact Registry  |
| my-repo            |
| stores image tags  |
+---------+----------+
          |
          | deploy image
          v
+--------------------+
| Build Step 3       |
| gcloud run deploy  |
+---------+----------+
          |
          | new revision
          v
+--------------------+
| Cloud Run Service  |
| cloudrunshow       |
| serves website     |
+--------------------+
```

## Responsibility Split

這條流程裡，GitHub 與 GCP 的責任不同，不能混在一起看。

### GitHub Does Not Build Or Run The App

GitHub 在這個流程中的角色只有：

- 存放原始碼
- 接收你從 local push 上去的 commit
- 觸發 GCP 的 Cloud Build trigger

GitHub **不會**做下面這些事：

- 不會建立 Docker image
- 不會保存正式部署用的 image
- 不會執行 container
- 不會提供 Cloud Run 網址

### GCP Builds, Stores, And Runs Everything After Push

當 GitHub 收到新的 commit 後，真正做事的是 GCP：

- **Cloud Build**
  - 抓 GitHub 上的最新程式碼
  - 執行 `Dockerfile`
  - 建立 Docker image
  - 執行 `cloudbuild.yaml`
- **Artifact Registry**
  - 保存 Cloud Build 建好的 image
- **Cloud Run**
  - 從 Artifact Registry 拉 image
  - 建立新的 revision
  - 對外提供網站 URL

可以用這句話記：

```text
GitHub stores code.
GCP builds the image.
GCP stores the image.
GCP runs the container.
```

## Step By Step

### 1. Local Development

你在本機專案目錄開發：

- 修改 `src/` 裡的 React 程式碼
- 必要時修改 `Dockerfile`、`nginx.conf.template`、`cloudbuild.yaml`
- 本機做基本驗證，例如 lint、型別檢查、畫面確認

這一階段只發生在你的 local repo，GCP 還不會有任何變化。

### 2. Git Commit

當你確認本機修改完成後：

```bash
git add .
git commit -m "your message"
```

這一步是把目前修改固定成一個 commit。這個 commit 之後會成為 GCP build 的來源版本。

### 3. Push To GitHub

```bash
git push origin main
```

這一步會把最新 commit 推到 GitHub repo：

- Repository: `ShackArbeit/CloudRunShow`
- Branch: `main`

因為你已經在 GCP 建立好 Cloud Build trigger，所以這個 push 事件會被監聽。

## Trigger Layer

```text
Local commit
   |
   v
push to GitHub main
   |
   v
Cloud Build Trigger detects new commit
   |
   v
GCP starts build and deploy work
```

### 4. Cloud Build Trigger Starts

GCP 端的 trigger：

- Trigger name: `CloudRuntTrigger`
- Event: push to branch
- Branch regex: `^main$`
- Config file: `cloudbuild.yaml`

只要 `main` 有新 commit，Cloud Build 就會自動開始一個新的 build。

## What Cloud Build Does

目前 `cloudbuild.yaml` 會依序做下面幾件事。

### 4.1 Fetch Source

Cloud Build 先從 GitHub 抓最新 commit。

例如：

- repo: `ShackArbeit/CloudRunShow`
- revision: 某個 `COMMIT_SHA`

這代表後面的 build 與 deploy 都是根據這個 commit 的內容執行。

### 4.2 Docker Build

Cloud Build 會使用專案根目錄的 `Dockerfile` 建 image。

這個 `Dockerfile` 的工作流程是：

```text
Node image
  -> npm ci
  -> npm run build
  -> output dist/
  -> copy dist/ into nginx image
```

實際上分成兩段：

1. Build stage
   - 使用 `node:22.12.0`
   - 安裝依賴
   - 執行 `npm run build`
   - 產出 `dist/`

2. Runtime stage
   - 使用 `nginx:alpine`
   - 複製 `dist/` 到 `/usr/share/nginx/html`
   - 使用 `nginx.conf.template`
   - 讓容器監聽 Cloud Run 提供的 `PORT`

### 4.3 Push Image To Artifact Registry

build 成功後，Cloud Build 會把 image 推到：

```text
asia-east1-docker.pkg.dev/rare-journal-462607-u7/my-repo/cloudrunshow
```

會有兩種 tag：

- `:latest`
- `:$COMMIT_SHA`

意義如下：

- `latest` 方便快速識別目前最新版本
- `COMMIT_SHA` 方便追蹤是哪一版程式部署上去

## Registry To Runtime Flow

```text
GitHub commit
   |
   v
Cloud Build creates image
   |
   v
Artifact Registry stores image
   |
   v
Cloud Run pulls that exact image
```

### 4.4 Deploy To Cloud Run

最後 Cloud Build 會執行：

```bash
gcloud run deploy cloudrunshow \
  --image asia-east1-docker.pkg.dev/rare-journal-462607-u7/my-repo/cloudrunshow:$COMMIT_SHA \
  --region asia-east1 \
  --platform managed \
  --allow-unauthenticated
```

這一步的效果是：

- Cloud Run 建立或更新 service `cloudrunshow`
- 新的 revision 會指向這次 build 出來的 image
- 外部使用者透過 Cloud Run URL 就能看到最新網站內容

## End To End Sequence

```text
1. You edit files locally
2. You commit changes
3. You push to GitHub main
4. GitHub notifies Cloud Build trigger
5. Cloud Build fetches repo source
6. Cloud Build runs Docker build
7. Docker image is pushed to Artifact Registry
8. Cloud Build runs gcloud run deploy
9. Cloud Run creates a new revision
10. The service URL now serves the new frontend
```

## Runtime Architecture

部署完成後，正式執行架構如下：

```text
User Browser
    |
    v
Cloud Run HTTPS URL
    |
    v
Container on Cloud Run
    |
    +--> NGINX
           |
           +--> /usr/share/nginx/html
                  |
                  +--> index.html
                  +--> assets/*.js
                  +--> assets/*.css
```

因為你現在是 React SPA，所以：

- 使用者進入 `/login`
- 或直接刷新 `/reports`

都會先由 NGINX 回傳 `index.html`，再由 React Router 接手前端路由。

## Files Involved

這個流程主要依賴以下檔案：

- `Dockerfile`
  - 定義如何 build 與產出正式容器
- `nginx.conf.template`
  - 定義 SPA fallback 與 Cloud Run port 對應
- `cloudbuild.yaml`
  - 定義 Cloud Build 如何 build、push、deploy
- `package.json`
  - 定義 `npm run build`
- `src/`
  - 你的 React 應用程式原始碼

## How To Verify A Deployment

每次 push 後可以這樣確認：

1. 到 GitHub 確認 commit 已經在 `main`
2. 到 GCP Cloud Build `History` 看這次 build 是否成功
3. 到 Artifact Registry 看是否有新的 image tag
4. 到 Cloud Run 看是否有新的 revision
5. 打開 Cloud Run service URL 檢查畫面是否已更新

## Failure Points

這條流程若失敗，通常會發生在以下階段：

### Local Stage

- 程式碼沒有 commit
- push 到錯的 branch

### Build Stage

- `Dockerfile` 錯誤
- Node 版本不相容
- `npm run build` 失敗

### Registry Stage

- Artifact Registry 權限不足
- image tag 或 repository 名稱錯誤

### Deploy Stage

- `run.googleapis.com` 沒啟用
- Cloud Build service account 權限不足
- Cloud Run 容器沒有正確監聽 `PORT`

## Current Production Path

你現在專案實際採用的是這條路：

```text
Windows local repo
  -> git push
  -> GitHub main
  -> Cloud Build Trigger
  -> Docker build in GCP
  -> Artifact Registry in GCP
  -> Cloud Run deploy in GCP
  -> public URL serves static React app
```

這表示你未來不需要在 local 安裝 Docker 也能完成部署，因為 image build 與 deploy 都已經交給 GCP 自動完成。

## One Sentence Summary

你現在的正式流程不是「GitHub 幫你部署」，而是：

```text
你把程式碼 push 到 GitHub，然後 GCP 根據 GitHub 的最新 commit 自動 build image、保存 image、並更新 Cloud Run。
```
