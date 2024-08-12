package store

import (
	"context"
	"fmt"
	"time"

	"github.com/redis/go-redis/v9"
)

type StorageService struct {
	redisClient *redis.Client
}

var (
	storeService = &StorageService{}
	ctx          = context.Background()
)

const CacheDuration = 6 * time.Hour

func Init() *StorageService {
	redisClient := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	pong, err := redisClient.Ping(ctx).Result()
	if err != nil {
		fmt.Printf("Error init Redis: %v", err)

	}
	fmt.Printf("\nRedis started sucessfully: pong message = {%s}", pong)
	storeService.redisClient = redisClient
	return storeService
}

func SaveUrlMapping(shortUrl, originalUrl, userID string) {
	err := storeService.redisClient.Set(ctx, shortUrl, originalUrl, CacheDuration).Err()
	if err != nil {
		fmt.Printf("Failed saving key url | Error: %v - shortUrl: %s - originalUrl: %s\n", err, shortUrl, originalUrl)
	}
}

func RetrieveOriginalUrl(shortUrl string) string {
	result, err := storeService.redisClient.Get(ctx, shortUrl).Result()
	if err != nil {
		fmt.Printf("Failed RetrieveInitialUrl url | Error: %v - shortUrl: %s\n", err, shortUrl)
	}
	return result
}
