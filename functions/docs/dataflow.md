# データフロー

1. GitHub Discussionsで質問が作られる
2. GitHub Actionsが起動してFirebase Functionsをトリガーする
3. Slackに通知が行く


## Firebase FunctionsのURLをSecretで管理するのめんどい

Firebase FunctionsのURLをSecretから読んでるけど環境構築の容易性を確保するために、もっと別の方法でやりたい。

### Secretでやっていた理由
- 実装的にエンドポイントにリクエストできてしまったらSlackの通知飛ばせまくりだったので

### 解決案
- サーバーのURLは普通に公開する&discussionのidが含まれるworkspaceが無かったら何もしないという仕様にする