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
