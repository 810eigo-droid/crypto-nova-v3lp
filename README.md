# Crypto Nova — ランディングページ

暗号資産市場のデータ分析を可視化するアプリ「Crypto Nova（クリプト・ノヴァ）」のLPです。
淡いブルー × 白 × ゴールドの明るいデザイン。静的サイト（HTML / CSS / JavaScript のみ）で、
ビルド作業は不要です。

## 構成

```
index.html        … LP本体（S1〜S9 + 最終CTA）
css/style.css     … デザイン
js/main.js        … アニメーション・画像プレースホルダ制御
images/           … 画像を入れるフォルダ（下記参照）
```

## ローカルでの確認方法

VS Code + Live Server 拡張機能で `index.html` を「Go Live」で開いてください。
（アニメーションがJavaScriptを使うため、ファイルを直接ダブルクリックする方法だと
一部が正しく動きません）

## 画像について

各画像スロットはプレースホルダになっており、`images/` フォルダに
**下記のファイル名と同じ名前（WEBP形式）で保存するだけ**で自動的に差し替わります。
コードの編集は不要です。詳細は `images/README.md` を参照してください。

## 公開（GitHub Pages）

Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/ (root)` に設定すると、
`https://810eigo-droid.github.io/crypto-nova-v3lp/` で公開されます。

## 差し替え・要確認の箇所

- S4：デモ動画（`index.html` の「動画埋め込み位置」コメント内に iframe/video を挿入）
- 最終CTAボタンのリンク先 URL（お申し込みページ）
- フッターの「特定商取引法に基づく表記」「プライバシーポリシー」リンク

## 注意

本LPは市場データの分析・情報提供に関する内容であり、利益を保証するものではありません。
掲載する媒体（広告審査等）の規定に沿ってご利用ください。
