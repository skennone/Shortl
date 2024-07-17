package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/skennone/go-url-shortener/handler"
	"github.com/skennone/go-url-shortener/store"
)

func main() {
	r := gin.Default()
	r.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{
			"message": "Hey Go URL Shortener!",
		})
	})
	r.POST("/create-short-url", func(c *gin.Context) {
		handler.CreateShortUrl(c)
	})
	r.GET("/:shortUrl", func(c *gin.Context) {
		handler.HandleShortUrlRedirect(c)
	})
	store.Init()
	err := r.Run(":8082")
	if err != nil {
		panic(fmt.Sprintf("Failed to start the web server - Error: %v", err))
	}
}
