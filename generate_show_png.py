from PIL import Image, ImageDraw, ImageFont


WIDTH = 1900
HEIGHT = 1280
BG = "#f4f7fb"
INK = "#102033"
MUTED = "#5b718a"
TEAL = "#1f8a85"
AMBER = "#f6b24a"
PANEL = "#ffffff"
PANEL_ALT = "#eef4f8"
LINE = "#c7d7e6"


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/msjhbd.ttc" if bold else "C:/Windows/Fonts/msjh.ttc",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size=size)
        except OSError:
            continue
    return ImageFont.load_default()


TITLE = load_font(38, bold=True)
SUBTITLE = load_font(24, bold=True)
BODY = load_font(20)
SMALL = load_font(17)


img = Image.new("RGB", (WIDTH, HEIGHT), BG)
draw = ImageDraw.Draw(img)


def rounded_box(x1, y1, x2, y2, title, lines, fill=PANEL, accent=TEAL):
    draw.rounded_rectangle((x1, y1, x2, y2), radius=28, fill=fill, outline=LINE, width=2)
    draw.rounded_rectangle((x1 + 18, y1 + 18, x1 + 170, y1 + 54), radius=18, fill=accent)
    draw.text((x1 + 34, y1 + 24), title, font=SMALL, fill="white")
    cursor_y = y1 + 72
    for index, line in enumerate(lines):
        font = SUBTITLE if index == 0 else BODY
        fill_color = INK if index == 0 else MUTED
        draw.text((x1 + 24, cursor_y), line, font=font, fill=fill_color)
        cursor_y += 34 if index == 0 else 28


def arrow(points, color=TEAL, width=4):
    draw.line(points, fill=color, width=width)
    x1, y1 = points[-2]
    x2, y2 = points[-1]
    if abs(x2 - x1) >= abs(y2 - y1):
        direction = 1 if x2 > x1 else -1
        tip = (x2, y2)
        left = (x2 - 16 * direction, y2 - 8)
        right = (x2 - 16 * direction, y2 + 8)
    else:
        direction = 1 if y2 > y1 else -1
        tip = (x2, y2)
        left = (x2 - 8, y2 - 16 * direction)
        right = (x2 + 8, y2 - 16 * direction)
    draw.polygon([tip, left, right], fill=color)


draw.text((70, 48), "ReportsPage 元件功能關聯圖", font=TITLE, fill=INK)
draw.text(
    (70, 104),
    "以 /reports 為中心，整理畫面組裝、狀態管理、資料查詢、資料展示與錯誤/空狀態回饋之間的關係。",
    font=BODY,
    fill=MUTED,
)

# Core page
rounded_box(
    720,
    180,
    1180,
    360,
    "Core",
    [
        "ReportsPage",
        "頁面組裝者",
        "整合 filters、data、error、loading 與各區塊 Panel",
        "依狀態決定要顯示表單、摘要卡、圖表、表格或空狀態",
    ],
    fill="#ffffff",
    accent=INK,
)

# Hooks
rounded_box(
    70,
    220,
    520,
    430,
    "Hook",
    [
        "useReportFilters",
        "管理篩選狀態",
        "持有 dateFrom / dateTo / category / preset / page",
        "提供 setPreset、setDateRange、setCategory、setPage",
        "產生 activeRangeLabel 給畫面說明文字",
    ],
    fill=PANEL_ALT,
)
rounded_box(
    70,
    500,
    520,
    730,
    "Hook",
    [
        "useReportsData",
        "管理查詢狀態",
        "接收 filters 後呼叫 fetchReports(filters)",
        "回傳 data、isLoading、error、reload",
        "filters 改變時自動重新查詢",
    ],
    fill=PANEL_ALT,
)

# Data source
rounded_box(
    70,
    810,
    520,
    1070,
    "Data",
    [
        "mock/reports + reportService",
        "模擬 API / service 層",
        "reportCategories: 篩選器 fallback 分類來源",
        "mockOrders: 原始訂單資料",
        "fetchReports: 篩選、分頁、統計 summary / chart / table",
    ],
    fill="#fff8ef",
    accent=AMBER,
)

# UI blocks
rounded_box(
    1370,
    150,
    1820,
    330,
    "UI",
    [
        "PageHeader",
        "頁首資訊",
        "顯示頁面 title、description、右上 action badge",
    ],
)
rounded_box(
    1370,
    370,
    1820,
    620,
    "UI",
    [
        "Panel",
        "共用卡片容器",
        "包住 Filters / Error / Snapshot / Trend / Orders",
        "統一標題、描述、邊框、間距與 RWD 外觀",
    ],
)
rounded_box(
    1370,
    660,
    1820,
    900,
    "UI",
    [
        "ReportFiltersPanel",
        "篩選器操作介面",
        "提供 preset 按鈕、Start Date、End Date、Category",
        "不持有狀態，只透過 callback 回傳使用者操作",
    ],
)
rounded_box(
    1370,
    940,
    1820,
    1210,
    "UI",
    [
        "LoadingSpinner / EmptyState",
        "狀態回饋元件",
        "LoadingSpinner: 資料讀取中",
        "EmptyState: 無資料或錯誤提示，可附 retry action",
    ],
)

# Data visualization
rounded_box(
    720,
    470,
    1180,
    650,
    "View",
    [
        "Snapshot Panel",
        "摘要卡區塊",
        "顯示 totalRevenue、totalOrders、AOV、paidRate",
    ],
)
rounded_box(
    720,
    710,
    1180,
    900,
    "View",
    [
        "Trend Panel + ReportChart",
        "趨勢視覺化",
        "用 Chart.js 顯示 Revenue 與 Orders 折線圖",
    ],
)
rounded_box(
    720,
    960,
    1180,
    1210,
    "View",
    [
        "Orders Panel",
        "表格與分頁區塊",
        "ReportsTable: 顯示 rows",
        "ReportsPagination: 顯示 page / totalPages 並切頁",
    ],
)

# arrows from hooks/data to core
arrow([(520, 325), (650, 325), (720, 270)], color=TEAL)
arrow([(520, 615), (650, 615), (720, 300)], color=TEAL)
arrow([(520, 940), (650, 940), (720, 320)], color=AMBER)

# core to right side ui
arrow([(1180, 250), (1280, 250), (1370, 240)], color=INK)
arrow([(1180, 270), (1280, 270), (1370, 460)], color=INK)
arrow([(1180, 290), (1280, 290), (1370, 760)], color=INK)
arrow([(1180, 320), (1280, 320), (1370, 1040)], color=INK)

# core to view blocks
arrow([(950, 360), (950, 470)], color=TEAL)
arrow([(950, 650), (950, 710)], color=TEAL)
arrow([(950, 900), (950, 960)], color=TEAL)

# detailed relations
arrow([(1600, 780), (1290, 780), (1180, 1010)], color=TEAL)
arrow([(1600, 780), (1290, 780), (1180, 770)], color=TEAL)
arrow([(1600, 1080), (1290, 1080), (1180, 1090)], color=AMBER)
arrow([(300, 430), (300, 465), (300, 500)], color=TEAL)
arrow([(300, 730), (300, 770), (300, 810)], color=AMBER)

# legend
draw.rounded_rectangle((590, 38, 1220, 120), radius=20, fill="#ffffff", outline=LINE, width=2)
draw.text((618, 62), "線條說明:", font=BODY, fill=INK)
draw.line((730, 77, 790, 77), fill=TEAL, width=4)
draw.text((806, 62), "互動 / 狀態流", font=BODY, fill=MUTED)
draw.line((1010, 77, 1070, 77), fill=AMBER, width=4)
draw.text((1086, 62), "資料來源 / service 流", font=BODY, fill=MUTED)

img.save("show.png")
