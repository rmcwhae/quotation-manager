package middleware

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func AuthorizeAPIKey() gin.HandlerFunc {
	validAPIKey := os.Getenv("API_KEY")

	return func(c *gin.Context) {
		apiKey := c.GetHeader("X-API-KEY")

		// Make sure a valid API key is set
		if validAPIKey == "" {
			c.AbortWithStatus(http.StatusInternalServerError)
		}

		// Make sure the API key is valid
		if apiKey != validAPIKey {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}
