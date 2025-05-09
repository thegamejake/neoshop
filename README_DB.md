# NEOShop 資料庫設置指南

## 資料庫配置

本專案使用 MySQL 作為資料庫。在運行前，請先設置您的 MySQL 資料庫。

### 環境變數設置

在項目根目錄創建 `.env.local` 文件，添加以下配置：

```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=neoshop
DB_PORT=3306
PORT=3001
```

請將 `your_mysql_username` 和 `your_mysql_password` 替換為您的 MySQL 用戶名和密碼。

### 創建資料庫

請先在 MySQL 中創建 `neoshop` 資料庫：

```sql
CREATE DATABASE neoshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 運行指南

### 啟動 API 服務器

```bash
npm run api
```

這將啟動 API 服務器在端口 3001，並自動初始化資料庫表及示例數據。

### 啟動前端應用

```bash
npm run dev
```

前端應用將運行在 http://localhost:3000

## 資料庫結構

本專案的資料庫包含以下表格：

1. `categories` - 產品分類
2. `products` - 產品基本信息
3. `sizes` - 尺寸列表
4. `colors` - 顏色列表
5. `product_variants` - 產品變體(尺寸、顏色組合)

API 服務器啟動時會自動創建這些表格並填充示例數據。

## API 端點

本專案包含以下 API 端點：

- `GET /api/products` - 獲取所有產品列表

## 注意事項

首次啟動時，系統會自動創建所需的表格並插入示例數據。如果您想重置數據庫，可以刪除 `neoshop` 資料庫並重新創建：

```sql
DROP DATABASE neoshop;
CREATE DATABASE neoshop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然後重啟 API 服務器。 