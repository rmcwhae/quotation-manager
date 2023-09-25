package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"github.com/russellmcwhae/quotation-manager/model"
)

func main() {
	// Setup database
	db, err := gorm.Open(sqlite.Open("quotations.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&model.Source{}, &model.Quotation{})

	// Setup routes
	r := gin.Default()

	r.GET("/sources", func(c *gin.Context) {
		var sources []model.Source
		err := db.Model(&model.Source{}).Preload("Quotations").Find(&sources).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, sources)
	})
	r.GET("/sources/random", func(c *gin.Context) {
		var source model.Source
		db.Preload("Quotations").Order("RANDOM()").First(&source)
		c.JSON(200, source)
	})
	r.POST("/sources", func(c *gin.Context) {
		var source model.Source
		c.BindJSON(&source)
		db.Create(&source)
		c.JSON(200, source)
	})
	r.PUT("/sources/:id", func(c *gin.Context) {
		var source model.Source
		db.First(&source, c.Param("id"))
		c.BindJSON(&source)
		db.Save(&source)
		c.JSON(200, source)
	})
	r.GET("/quotations", func(c *gin.Context) {
		var quotations []model.QuotationWithSource
		err := db.Model(&model.Quotation{}).Preload("Source").Find(&quotations).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, quotations)
	})
	r.GET("/quotations/random", func(c *gin.Context) {
		var quotation model.QuotationWithSource
		err := db.Model(&model.Quotation{}).Preload("Source").Order("RANDOM()").First(&quotation).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, quotation)
	})
	r.POST("/quotations", func(c *gin.Context) {
		var quotation model.Quotation
		c.BindJSON(&quotation)
		db.Create(&quotation)
		c.JSON(200, quotation)
	})
	r.PUT("/quotations/:id", func(c *gin.Context) {
		var quotation model.Quotation
		db.First(&quotation, c.Param("id"))
		c.BindJSON(&quotation)
		db.Save(&quotation)
		c.JSON(200, quotation)
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
