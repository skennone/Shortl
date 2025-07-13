# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## redis: create redis-docker
.PHONY: redis
redis:
	@echo 'Creating redis docker'
	docker volume create redis-vol
	docker run --name short-url-redis -p 6379:6379 -v redis-vol:/var/lib/redis/content -d redis:7.2.5-alpine

postgres:
	@echo 'Creating postgres docker'
	docker volume create postgres-vol
	docker run --name short-url-postgres -p 5430:5432  -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -v postgres-vol:/var/lib/postgresql/data -d postgres:17.5-alpine
	sleep 3
	docker exec -it short-url-postgres  createdb --username=root --owner=root shortlDB
## run/server: run server
.PHONY: run/server
run/server:
	go run main.go

## run/client: run client
.PHONY: run/client
run/client:
	cd ./frontend && npm run dev

## remove/redis: remove redis-docker
.PHONY: remove/redis
remove/redis:
	@echo 'Remove redis docker'
	docker stop short-url-redis
	docker rm short-url-redis
	docker volume rm redis-vol

.PHONY: run
run:
	docker compose up --build --no-recreate -d client api redis

.PHONY: down
down:
	docker compose down
