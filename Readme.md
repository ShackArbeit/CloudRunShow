# ShowExam Dashboard

一個以 **Vite + React + TypeScript + Tailwind CSS** 建立的前端測驗作品。整體採用左側 Sidebar、右側主內容區的 dashboard layout，包含兩個主要題目：

1. 題目一：登入表單
2. 題目二：數據統計報表

專案重點不只是完成功能，也刻意將 UI、資料結構、hooks、service 與 mock 資料拆開，保留後續替換成真實 API 或擴充模組的空間。

## 技術選型

- **Vite**：提供快速的開發體驗與建置流程。
- **React 19**：作為 UI 框架，搭配函式型元件與 hooks。
- **TypeScript**：維持型別安全與可維護性。
- **Tailwind CSS**：負責整體設計系統、響應式版型與細節樣式。
- **React Router**：處理登入頁與報表頁的路由切換。
- **Chart.js + react-chartjs-2**：呈現報表趨勢圖。
- **ESLint**：基本靜態檢查與程式風格約束。

## 專案結構說明

```text
src/
  components/
    navigation/    # Sidebar
    reports/       # 報表頁專用元件：篩選器、圖表、表格、分頁
    ui/            # 共用 UI 元件：Panel、PageHeader、Notice、EmptyState...
  hooks/           # 表單與報表邏輯 hooks
  layouts/         # Dashboard layout
  mock/            # mock API 與假資料
  pages/           # LoginPage、ReportsPage
  routes/          # React Router 設定
  services/        # auth / reports service
  types/           # auth、reports、navigation 型別
  utils/           # className 與 storage 等工具
```

## 安裝方式

```bash
npm install
```

## 啟動方式

開發模式：

```bash
npm run dev
```

正式建置：

```bash
npm run build
```

預覽建置結果：

```bash
npm run preview
```

程式檢查：

```bash
npm run lint
```

## 題目一功能說明

登入頁包含以下能力：

- Email 格式驗證
- 密碼至少 6 碼
- 欄位 blur 後顯示錯誤訊息
- 提交時顯示 loading 並停用按鈕
- 模擬呼叫 `/api/login`
- 登入成功後顯示成功狀態與 session 卡片
- accessToken 寫入 `localStorage`
- 支援密碼顯示 / 隱藏切換
- 401 未授權時自動清除 token 並提示重新登入

### 測試帳號

- Email：`demo@showexam.dev`
- Password：`Codex123`

### 401 模擬方式

將帳號輸入為：

```text
unauthorized@showexam.dev
```

並搭配任意符合長度規則的密碼，即可模擬 API 回傳 401。

## 題目二功能說明

報表頁包含以下能力：

- 日期區間篩選
- 分類篩選
- 條件變更後自動重新抓取資料
- 趨勢圖顯示營收與訂單數
- 電商訂單表格
- 前端分頁
- loading / error / empty state

報表資料是以 mock 電商訂單資料生成，支援多分類、多狀態與日期範圍查詢。

## 狀態管理與 API 模擬方式

本專案沒有引入額外全域狀態管理套件，而是依功能範圍使用 hooks 管理：

- `useLoginForm`：管理登入表單狀態、驗證、提交與成功/失敗回饋
- `useReportFilters`：管理日期、分類、分頁條件
- `useReportsData`：管理報表資料請求、loading、error 與 reload

API 模擬拆在 `mock/` 與 `services/`：

- `src/mock/auth.ts`：模擬登入 API
- `src/services/authService.ts`：處理登入流程與錯誤正規化
- `src/mock/reports.ts`：建立報表假資料
- `src/services/reportService.ts`：依篩選條件回傳圖表、摘要與分頁結果

這樣的拆法可以讓 UI 元件不直接依賴硬編碼資料，之後若要串接真實後端，只需替換 service 層實作。

## 401 處理方式

401 流程集中在 `authService`：

1. mock API 回傳 401
2. service 層正規化錯誤
3. 自動清除 `localStorage` 內的 accessToken 與 user 資訊
4. 回傳對應訊息給頁面顯示

對使用者來說，會看到重新登入提示，並且 session 狀態會被清空。

## 報表頁的篩選 / 圖表 / 分頁 / 空狀態設計說明

### 篩選

- 支援 `7d`、`30d`、`90d` 預設區間
- 也支援手動自訂 `dateFrom` / `dateTo`
- 分類可切換 `All`、`Electronics`、`Fashion`、`Home`、`Beauty`、`Sports`

### 圖表

- 使用 **Chart.js**
- 目前顯示最近一段時間的 `Revenue` 與 `Orders` 趨勢
- 摘要卡片與圖表使用同一批篩選結果，避免不同步

### 分頁

- 目前採前端分頁
- response 結構保留 `total`、`page`、`pageSize`、`totalPages`
- 後續可直接改為後端分頁，不需大改頁面結構

### 空狀態

- 當篩選結果為 0 筆時，不顯示空白表格，而是明確顯示 empty state
- 可將日期改為 `2025-01-01` 到 `2025-01-31` 測試

### 錯誤狀態

- 可將分類設為 `Sports`，開始日期設為 `2026-02-01`
- 這會觸發 mock service 的錯誤情境，用來驗證 error UI 與重試按鈕

## 可再延伸的優化方向

- 串接真實登入 API 與後端報表 API
- 將 auth 狀態抽成更完整的 session provider
- 報表頁改為後端分頁或 infinite loading
- 加入更完整的篩選條件，例如訂單狀態、金額區間
- 補上單元測試與元件測試
- 將 design tokens 進一步抽離成更完整的設計系統
- 新增權限控管與受保護路由

## 驗證狀態

目前專案已驗證：

- `npm run lint`
- `tsc -b`
- `npm run build`

都可正常通過。
