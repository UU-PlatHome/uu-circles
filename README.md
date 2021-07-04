# UU-Circles

UU-Circles: https://uu-circles.com/

<p align="center">
<img src="./docs/uu-circles.png" alt="サークル一覧" />
</p>

\\宇大生による//宇大生のためのメディアサイト uu-yell: https://media.uu-circles.com/

<p align="center">
<img src="./docs/uuyell-post.png" alt="メディアサイト" />
</p>

## Description

- 開発者へ: [development.md](./docs/development.md)
- インフラ: [infra.md](./docs/infra.md)

## 機能

[機能一覧/Change log](https://ulab-uu.com/2021/04/22/uu-circles-uu-yell-change-log/)

### メイン画面

- サークル一覧
- サークル一覧 タグ検索
- サークル一覧 カテゴリー検索
- 今日の新歓
- 新歓一覧
- 統計情報
- おすすめのuu-yellの記事
- サークルに関するuu-yellの記事を表示する機能

### サークル管理画面

- サークル管理
- サークルタグ管理
- 新歓管理
- 部員アカウント管理

### 管理者画面

- サークル管理
- サークルタグ管理
- 新歓管理
- 広告管理
- お知らせ管理機能
- デモ管理機能
- 部員アカウント管理
- 管理者アカウント管理


### バッチ

- 死活監視バッチ
  - サーバーが落ちていないか確認
  - GitHub Action
  - シェル
- 新歓通知バッチ
  - Discordへ「今日の新歓」を通知する
  - GitHub Action
  - Python
- uu-yellの最新記事の通知バッチ
  - Discordへ「今日のuu-yellの記事」を通知する
  - GitHub Action
  - Python
  - WordPress API
- uu-yellの記事をUU-CirclesのDBにコピーするバッチ
  - Laravel
  - MySQL
  - WordPress API
- 広告の１日のクリック数を計測するバッチ
  - Laravel
  - MySQL
- お知らせの１日のクリック数を計測するバッチ
  - Laravel
  - MySQL
- Google AnalyticsのデータをDBにコピーするバッチ
  - Laravel
  - MySQL
  - Google Analytics
- uu-yell (WordPress)のバックアップ
  - WordPress
  - BackWPup
