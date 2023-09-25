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

func CreateSource(c *gin.Context) {
	var source model.Source
	c.BindJSON(&source)
	database.DB.Create(&source)

	c.JSON(200, source)
}

func EditSource(c *gin.Context) {
	var source model.Source
	database.DB.First(&source, c.Param("id"))
	c.BindJSON(&source)
	database.DB.Save(&source)

	c.JSON(200, source)
}

func FetchQuotations(c *gin.Context) {
	var quotations []model.QuotationWithSource
	err := database.DB.Model(&model.Quotation{}).Preload("Source").Find(&quotations).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, quotations)
}

func FetchRandomQuotation(c *gin.Context) {
	var quotation model.QuotationWithSource
	err := database.DB.Model(&model.Quotation{}).Preload("Source").Order("RANDOM()").First(&quotation).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, quotation)
}

func CreateQuotation(c *gin.Context) {
	var quotation model.Quotation
	c.BindJSON(&quotation)
	database.DB.Create(&quotation)

	c.JSON(200, quotation)
}

func EditQuotation(c *gin.Context) {
	var quotation model.Quotation
	database.DB.First(&quotation, c.Param("id"))
	c.BindJSON(&quotation)
	database.DB.Save(&quotation)

	c.JSON(200, quotation)
}
