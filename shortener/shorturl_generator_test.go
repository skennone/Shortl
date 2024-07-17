package shortener

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

const UserId = "88e1a57c-187c-4fe7-aaca-d2a32e6e6739"

func TestShortLinkGenerator(t *testing.T) {
	initialLink_1 := "https://blog.x.com/engineering/en_us/a/2015/handling-five-billion-sessions-a-day-in-real-time"
	shortLink_1 := GenerateShortLink(initialLink_1, UserId)
	assert.Equal(t, shortLink_1, "6uBAoWfy")
}
