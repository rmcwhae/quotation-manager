package main

import (
	"github.com/gin-gonic/gin"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/joho/godotenv"
	"github.com/russellmcwhae/quotation-manager/api"
	"github.com/russellmcwhae/quotation-manager/database"
	"github.com/russellmcwhae/quotation-manager/middleware"
)

func main() {
	// Setup database
	database.SetupDB()

	godotenv.Load()

	r := setupGin()

	r.GET("/sources", api.FetchSources)
	r.GET("/quotations", api.FetchQuotations)
	r.GET("/quotations/random", api.FetchRandomQuotation)
	r.POST("/sources", middleware.AuthorizeAPIKey(), api.CreateSource)
	r.PUT("/sources/:id", middleware.AuthorizeAPIKey(), api.EditSource)
	r.POST("/quotations", middleware.AuthorizeAPIKey(), api.CreateQuotation)
	r.PUT("/quotations/:id", middleware.AuthorizeAPIKey(), api.EditQuotation)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func setupGin() *gin.Engine {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}
	config.AllowCredentials = true
	config.AllowHeaders = []string{"authorization", "content-type", "X-API-KEY"}

	r.Use(cors.New(config))
	r.Use(gzip.Gzip(gzip.DefaultCompression))

	r.GET("/status", func(context *gin.Context) {
		context.JSON(200, "ok")
	})

	return r
}
