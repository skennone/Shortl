package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/skennone/go-url-shortener/shortener"
	"github.com/skennone/go-url-shortener/store"
)

type UrlCreationRequest struct {
	LongUrl string `json:"long_url"`
	UserId  string `json:"user_id"`
}

func CreateShortUrl(c *gin.Context) {
	var input UrlCreationRequest
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	shortUrl := shortener.GenerateShortLink(input.LongUrl, input.UserId)
	store.SaveUrlMapping(shortUrl, input.LongUrl, input.UserId)
	host := "http://localhost:8082/"
	c.JSON(http.StatusOK, gin.H{
		"message":   "short url created sucessfully",
		"short_url": host + shortUrl,
	})
}

func HandleShortUrlRedirect(c *gin.Context) {
	shortUrl := c.Param("shortUrl")
	originalUrl := store.RetrieveOriginalUrl(shortUrl)
	c.Redirect(http.StatusFound, originalUrl)
}
