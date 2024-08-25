# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## redis: create redis-docker
.PHONY: redis
redis:
	@echo 'Creating redis docker'
	docker volume create redis-vol
	docker run --name short-url-redis -p 6379:6379 -v redis-vol:/var/lib/redis/content -d redis:7.2.5-alpine

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
