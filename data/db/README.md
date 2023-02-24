# ECサイト構築

## PostgREST のインストール

### MacOS

Homebrew からインストールできます。

```sh
brew install postgrest
```

### WSL

https://github.com/PostgREST/postgrest/releases/latest から、postgrest-<version>-linux-static-x64.tar.xz をダウンロードする。

```sh
cd ~/tmp
# version にバージョンを設定する
version="v10.1.2"
curl -LO "https://github.com/PostgREST/postgrest/releases/download/${version>}/postgrest-${version}-linux-static-x64.tar.xz"
```

展開する。

```sh
tar xJf "postgrest-${version}-linux-static-x64.tar.xz
```

ファイル postgrest を PATH が通っているディレクトリに移動する。
- e.g.) `/usr/local/bin`

## PostgREST のセットアップ

1. schema の作成
2. 2 種類の role の作成
3. テーブル作成時に role に権限を付ける

### 前提

ローカルホストで PostgreSQL が起動していること。

### 0. PostgreSQL に接続

postgres データベースに接続する。

### 1. schema の作成

[create_schema.sql](./data/db/create_schema.sql) を実行する。

### 2. 2 種類の role の作成

[create_roles.sql](./data/db/create_roles.sql) を編集する。
- 3 行目 `'password'` を他のパスワードにする。

create_roles.sql を実行する。

### 3. DDLを作成する

サンプルは[こちら](./data/db/create_tables.sql) 。

- テーブルとレコードは各チームで作成。
- `GRANT` から始まる２行を各テーブル作成時に実行する必要がある。

## PostgREST 設定

[api.conf](./data/db/api.conf) を編集する。
- db-uri の password: role の作成で設定したパスワードを指定
- jwt-secret: 32文字以上の英数字を指定

## PostgREST 起動

```sh
postgrest api.conf
```

## API アクセス

匿名アクセス(readonly)

```sh
curl http://localhost:8000/<table_name>
```

認証アクセス

```sh
TOKEN="<jwt token>"
curl -X POST http://localhost:8000/<table_name> \
-H "Authorization: Bearer $TOKEN" \
-H "Content-Type: application/json" \
-d '{ "name": "value" }'
```
