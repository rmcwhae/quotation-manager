package main

import (
	"github.com/gin-gonic/gin"

	"github.com/russellmcwhae/quotation-manager/api"
	"github.com/russellmcwhae/quotation-manager/database"
)

func main() {
	// Setup database
	database.SetupDB()

	// Setup routes
	r := gin.Default()

	r.GET("/sources", api.FetchSources)
	r.GET("/sources/random", api.FetchRandomSource)
	r.POST("/sources", api.CreateSource)
	r.PUT("/sources/:id", api.EditSource)
	r.GET("/quotations", api.FetchQuotations)
	r.GET("/quotations/random", api.FetchRandomQuotation)
	r.POST("/quotations", api.CreateQuotation)
	r.PUT("/quotations/:id", api.EditQuotation)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
