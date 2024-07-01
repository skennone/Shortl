package store

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

var testStoreServer = &StorageService{}

func init() {
	testStoreServer = Init()
}

func TestStoreInit(t *testing.T) {
	assert.True(t, testStoreServer.redisClient != nil)
}

func TestInsertAndRetrieval(t *testing.T) {
	originalUrl := "https://developers.googleblog.com/en/the-go-language-turns-10-a-look-at-gos-growth-in-the-enterprise/"
	userUUId := "e593b35d-2978-4223-8596-5b3aac885ccd"
	shortUrl := "KLasd9231XJO"

	SaveUrlMapping(shortUrl, originalUrl, userUUId)

	retrievedUrl := RetrieveOriginalUrl(shortUrl)
	assert.Equal(t, originalUrl, retrievedUrl)
}
