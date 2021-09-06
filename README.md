# Easy調整入力くん
## 現在
TypescriptとNext.js, Chakra UIを用いて， より使いやすさに特化したものを作ろうとしています．
https://github.com/itacchi3/NewEasyChousei


## 概要

LINE上で動く，スマホ入力に特化した，時間ごとの調整アプリケーションです．

## なぜ作ったの？

所属していたアカペラサークルでは，グループごとに練習や会議などをよく行うため，時間ごとの日程調整をよく行います．しかし，既存のサービスではスマホでかなり使いづらく，サークル員の不満が募っていました．  
そこでスマホでも入力しやすい時間ごとの日程調整アプリを開発することにしました．

## こだわりのポイントは？

2点あります．  
1点目はタップ操作とスライド動作を沢山用い，サクサク操作をできるようにした点です．  
既存のサービスでは出欠表の作成をテキストベースで行っているなど，かなり入力に時間がかかっていました．そこで，直感的な操作で出欠表の作成や出欠の解答をできるようにすることでズムーズに日程調整ができるようにしました．  
2点目はLINE上で完結する点です．  
大学生のメッセージのやり取りはほとんどLINEのみを用いて行っています．そこで，LINE上ですべてが完結するアプリにすることで，日程調整をする際の手間を減らし，日程調整の面倒くささを減らすようにしました．

## どんな人を対象にしている？

会議や練習などの日程調整をよくするサークルや，バイトのシフトを提出する際に使ってほしいです．

## 使った技術は？？

React, Liff, Firebase, Dockerを用いています．
現在， TypescriptとNext.jsを用いて， 同じアプリケーションを作ろうとしています．
https://github.com/itacchi3/NewEasyChousei

## URL
<https://lin.ee/InOsTpg/>

## 使い方
上のリンクからEasy調整入力くんのアカウントを友だち追加します．

<img src="https://user-images.githubusercontent.com/72689870/122573292-93945180-d089-11eb-95e7-3929429d4e7c.JPG" width="200px"> <img src="https://user-images.githubusercontent.com/72689870/122574013-2af9a480-d08a-11eb-8250-73faafde9239.jpg" width="200px">

画面の下の方にある出欠表を作成するというメニューをタップし， 出欠表を作成する．

<img src="https://user-images.githubusercontent.com/72689870/122575285-8e380680-d08b-11eb-944e-09ab314bdd79.jpg" width="200px"> <img src="https://user-images.githubusercontent.com/72689870/122575411-b0ca1f80-d08b-11eb-8d7e-3b91cb70b5c6.jpg" width="200px">

イベントを作るボタンを押すと，LINEのトークに自動に戻り，出欠表のリンクがトークに現れます．

<img src="https://user-images.githubusercontent.com/72689870/122576257-7745e400-d08c-11eb-98d6-ddfa0ff181ac.jpg" width="200px"> 

リンクをタップし，名前とコメントを入力します．

<img src="https://user-images.githubusercontent.com/72689870/122576453-aa887300-d08c-11eb-8f1c-62c7d250e98d.jpg" width="200px"> <img src="https://user-images.githubusercontent.com/72689870/122576479-aeb49080-d08c-11eb-9d76-b16b1aba8c7b.jpg" width="200px"> 

時間候補を入力するボタンを押して，参加可能時間候補を入力する．

画面の下の方にある，○△✗ボタンを選択したあとに，候補時間ボタンをタップすると，色が変わり，参加可能かどうかを入力できます

<img src="https://user-images.githubusercontent.com/72689870/122577194-75305500-d08d-11eb-9426-ddb6a3da2dc8.jpg" width="200px">

参加可能時間候補を入力すると，出欠表に追加されます．

友達に共有したい場合は，出欠表リンクをコピーして友達にリンクを送信するか，友達に共有するボタンを押して，共有したい友達を選択します．


<img src="https://user-images.githubusercontent.com/72689870/122577516-d6f0bf00-d08d-11eb-8100-3d664aa0ddc5.jpg" width="200px"> <img src="https://user-images.githubusercontent.com/72689870/122577529-da844600-d08d-11eb-887a-96190c5da022.jpg" width="200px">

## 環境構築方法は？

リポジトリをクローンしたあと以下のようにターミナルに入力します．

```shell
$ docker-compose build //コンテナの構築
$ docker-compose run --rm react sh -c "npm install" //npmパッケージをインストール
$ docker-compose up -d // バックグラウンドでコンテナを起動
$ docker exec -it "作成したコンテナの名前"_react_1 /bin/ash // 起動しているコンテナにログイン
$ cd workplace //ワークプレイスに移動
```


