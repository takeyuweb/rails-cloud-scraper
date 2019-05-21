# README

```bash
docker-compose -f docker-compose.dev.yml build
docker-compose -f docker-compose.dev.yml up
```

```bash
docker-compose -f docker-compose.dev.yml exec app bundle exec rails db:create
docker-compose -f docker-compose.dev.yml exec app bundle exec rails db:migrate
```

Open http://localhost:3000

## PubSub + CloudFunction

```bash
docker-compose -f docker-compose.dev.yml exec app bundle exec rails
```

`docker-compose -f docker-compose.dev.yml up` のログで、 `pubsub` エミュレータで受け取ったメッセージを Functions に送り実行することを確認できる。
