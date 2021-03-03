# インストールとサインアップ

ハンズオン開催までにお願いしたい事前準備がいくつかあります(ソフトウェアのインストール、サービスへのサインアップ)。

すでに開発をされている方はほとんど手間がかからないと思います。
まだの方はこの機会にがんばって環境を整えてみてください。

各プロダクトのインストール手順は示しませんが、公式ドキュメントに従ってインストールしていただければOKです。
どうしてもわからない場合は当日サポートしますが、ハンズオンの時間を有効活用するため、できるだけ準備をお願いします。

## Git

[Git](https://git-scm.com/)をインストールしておいてください。


## Node.js

[Node.js](https://nodejs.org/ja/)のVersion12(LTS)を利用できるようにしておいてください。

インストール方法はインストーラーでもnvm,nodebrew等でも構いません。

``` sh
$ node --version
v12.18.0
```

## テキストエディタ

JavaScriptのコーディング用にテキストエディタを用意しておいてください。
Vim, Emacs, Visual Studio Code等、普段使い慣れているもので結構です。

特にこだわりがなければ、[Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code/)をおすすめします。


## Googleアカウント

Googleのアカウントを作成しておいてください。
Firebaseの利用に必要となります。

https://support.google.com/accounts/answer/27441?hl=ja


## Firebase

### Firebaseプロジェクトの作成
ハンズオンで使用するFirebaseプロジェクトを作成します。

[Firebaseプロジェクトを作成する](https://firebase.google.com/docs/web/setup?hl=ja#create-firebase-project)を参照してください。

プロジェクト名は`chousei-firebase`にしてください。プロジェクト名を決めると、プロジェクト名を元に一意のプロジェクトIDが採番されます。

プロジェクトを作成する際にGoogle アナリティクスを有効にするか確認されます。今回のアプリではGoogle アナリティクスの機能を利用しないので有効にするをOFFにしておいてください。

プロジェクトIDは後から変更できないので、もし変更したい場合はプロジェクトを新しく作ってください。

`新しいプロジェクトの準備ができました`と表示されたらFirebaseプロジェクトの作成は完了です。


### Firebase CLIのインストール

[CLI を設定または更新する](https://firebase.google.com/docs/cli/?hl=ja#setup_update_cli)の手順に従って、Firebase CLIをインストールし、ログインまでしてみましょう。

`+  Success! Logged in as xxxxxx@gmail.com`
とコンソールに表示されれば、ログインが成功しています。

もし、`firebase`というコマンドが見つからない場合、npmのパスが通っていないためにグローバルインストールしたコマンド(firebase)を使えない可能性があります。
その場合は、下記コマンドの結果をパスに追加してください。

`npm bin -g`

### Firebaseプロジェクトにアプリを登録する
Firebaseプロジェクトのコンソールから、アプリを登録します。

まだ一つもアプリを登録していない場合は、Overviewに「開始するにはアプリを追加してください」と記載があるので、その上に並ぶアイコンの中から`</>`を選んでください。

これでWebアプリを登録することができます。

アプリ登録画面で、ニックネームに`chousei-firebase`を指定して「アプリを登録」をクリックしましょう。

※アプリの登録画面で、アプリのFirebase Hostingの設定をする項目がありますが、ここでは設定をせずに進めましょう。

「アプリを登録」をクリックすると`Firebase SDK の追加`という項目に移り以下のようなメッセージが表示されますが、ここではコピーや貼り付けは不要です。後ほど行います。
>これらのスクリプトをコピーして <body> タグの下部に貼り付けます。この作業は Firebase サービスを使用する前に行ってください。

「コンソールに進む」をクリックすればアプリの登録は完了です。


## SCM, CD/CI(GitLab)

[GitLab](https://about.gitlab.com/)のアカウントを作成しておいてください。

Google,Twitter,GitHub等のアカウントでサインインすることも可能です。


## あったほうがいいもの(任意)

### Chrome

開発には任意のブラウザを使用いただけますが、
[Chrome](https://www.google.com/intl/ja_ALL/chrome/)があると、トラブルシューティングやデバッグ等に便利です。

Visual Studio Codeをお使いの場合は、[Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)を
インストールすると簡単にVSCode上でデバッガが使用できるのでおすすめです。
