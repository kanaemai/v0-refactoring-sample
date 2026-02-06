# v0-refactoring-sample

v0（React）で作成した不動産案件管理システムを、**Svelte 5 (Runes) + SvelteKit + Tailwind CSS** にリファクタリングしたサンプルです。

## 技術スタック

| 項目           | 技術                                                        |
| -------------- | ----------------------------------------------------------- |
| フレームワーク | SvelteKit（最新版）                                         |
| 状態管理       | Svelte 5 Runes（`$state`, `$derived`, `$effect`, `$props`） |
| スタイル       | Tailwind CSS v4                                             |
| アイコン       | lucide-svelte                                               |
| 言語           | TypeScript                                                  |

## 主な画面・機能

- **ダッシュボード**（`/`）  
  進行中案件数・平均利益率・想定総利益・確定利益のサマリーカードと、案件一覧テーブルを表示します。行クリックで査定ページへ遷移します。
- **査定ページ**（`/assessment/[id]`）  
  物件の基本情報・金額設定の入力フォーム、KPI（粗利・利益率・表面利回り・償却年数）、収支内訳、レントロール（住戸一覧）を表示します。入力に応じて査定計算がリアクティブに更新されます。

## ディレクトリ構成

```
src/
├── lib/
│   ├── components/            # コンポーネント（3分類）
│   │   ├── layout/            # ページ枠組み（ヘッダーなど）
│   │   │   └── DashboardHeader.svelte
│   │   ├── shared/            # 共通UIパーツ（ボタン・カード・入力など）
│   │   │   ├── Button.svelte
│   │   │   ├── Card.svelte, CardHeader.svelte, CardTitle.svelte, CardContent.svelte, CardFooter.svelte
│   │   │   ├── Input.svelte, Label.svelte, Checkbox.svelte, Select.svelte
│   │   │   └── ...
│   │   └── specific/          # 機能専用（査定・案件一覧など）
│   │       ├── SummaryCards.svelte
│   │       ├── PropertyList.svelte
│   │       ├── AssessmentForm.svelte
│   │       ├── KpiCards.svelte
│   │       ├── IncomeBreakdown.svelte
│   │       └── RentRoll.svelte
│   ├── types/                 # 型定義
│   │   └── index.ts           # Property, RentRollItem, PropertyStatus
│   ├── utils/
│   │   └── mockProperties.ts  # モックデータ
│   └── utils.ts               # cn() などユーティリティ
├── routes/
│   ├── +layout.svelte         # 共通レイアウト
│   ├── +page.svelte           # ダッシュボード
│   └── assessment/
│       └── [id]/+page.svelte  # 査定ページ
├── app.css                    # Tailwindテーマ・グローバルCSS
└── app.html
```

- **layout/** … ヘッダー・フッター・サイドバーなど、ページ全体の枠組み用コンポーネント。
- **shared/** … ボタン・入力・カードなど、プロジェクト全体で再利用する汎用UI。
- **specific/** … 査定計算や案件一覧など、不動産管理機能に特化したコンポーネント。

## 開発

### 必要な環境

- Node.js 18+
- pnpm（推奨）

### セットアップ

```bash
pnpm install
```

### 開発サーバー

```bash
pnpm dev
```

ブラウザで `http://localhost:5173` を開くとダッシュボードが表示されます。案件行をクリックすると査定ページに遷移します。

### ビルド・プレビュー

```bash
pnpm build    # 本番ビルド
pnpm preview  # ビルド結果のプレビュー
```

### 品質チェック

```bash
pnpm check    # svelte-check（型・構文チェック）
pnpm lint     # Prettier + ESLint
pnpm format   # Prettier でフォーマット
```

## データと状態管理

- 案件データは `src/lib/utils/mockProperties.ts` のモック配列を利用しています。
- ダッシュボードの一覧・サマリーは `src/routes/+page.svelte` で `$state(properties)` を保持し、集計値は各コンポーネント内で `$derived` により算出しています。
- 査定ページでは URL の `[id]` に応じてモックから該当物件を取得し、`$state(formData)` と `$derived.by()` でフォームとKPI計算を連動させています。

## 参考

- 変換元: React（v0）の不動産案件管理システム
- 変換ルール: プロジェクトルートの `.cursorrules` を参照
