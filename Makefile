# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## create/docker: create redis/docker
.PHONY: create/docker
create/docker:
	@echo 'Creating redis docker'
	docker volume create redis-vol
	docker run --name short-url-redis -p 6379:6379 -v redis-vol:/var/lib/redis/content -d redis:7.2.5-alpine
