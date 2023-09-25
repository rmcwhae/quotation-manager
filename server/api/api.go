package api

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/russellmcwhae/quotation-manager/database"
	"github.com/russellmcwhae/quotation-manager/model"
)

func FetchSources(c *gin.Context) {
	var sources []model.Source
	err := database.DB.Model(&model.Source{}).Preload("Quotations").Find(&sources).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, sources)
}

func FetchRandomSource(c *gin.Context) {
	var source model.Source
	err := database.DB.Preload("Quotations").Order("RANDOM()").First(&source).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, source)
}
