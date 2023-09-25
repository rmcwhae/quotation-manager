package main

import (
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	// Setup database
	db, err := gorm.Open(sqlite.Open("quotations.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	db.AutoMigrate(&Source{}, &Quotation{})

	// Setup routes
	r := gin.Default()

	r.GET("/sources", func(c *gin.Context) {
		var sources []Source
		err := db.Model(&Source{}).Preload("Quotations").Find(&sources).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, sources)
	})
	r.GET("/sources/random", func(c *gin.Context) {
		var source Source
		db.Preload("Quotations").Order("RANDOM()").First(&source)
		c.JSON(200, source)
	})
	r.POST("/sources", func(c *gin.Context) {
		var source Source
		c.BindJSON(&source)
		db.Create(&source)
		c.JSON(200, source)
	})
	r.PUT("/sources/:id", func(c *gin.Context) {
		var source Source
		db.First(&source, c.Param("id"))
		c.BindJSON(&source)
		db.Save(&source)
		c.JSON(200, source)
	})
	r.GET("/quotations", func(c *gin.Context) {
		var quotations []QuotationWithSource
		err := db.Model(&Quotation{}).Preload("Source").Find(&quotations).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, quotations)
	})
	r.GET("/quotations/random", func(c *gin.Context) {
		var quotation QuotationWithSource
		err := db.Model(&Quotation{}).Preload("Source").Order("RANDOM()").First(&quotation).Error
		if err != nil {
			panic(err)
		}
		c.JSON(200, quotation)
	})
	r.POST("/quotations", func(c *gin.Context) {
		var quotation Quotation
		c.BindJSON(&quotation)
		db.Create(&quotation)
		c.JSON(200, quotation)
	})
	r.PUT("/quotations/:id", func(c *gin.Context) {
		var quotation Quotation
		db.First(&quotation, c.Param("id"))
		c.BindJSON(&quotation)
		db.Save(&quotation)
		c.JSON(200, quotation)
	})

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

// GormModel - base model for all models
type GormModel struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"-"`
	UpdatedAt time.Time      `json:"-"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Source struct {
	GormModel
	Title      string      `json:"title"`
	Author     string      `json:"author"`
	Url        *string     `json:"url"`
	Quotations []Quotation `gorm:"foreignKey:SourceID" json:"quotations"`
}

type Quotation struct {
	GormModel
	SourceID  uint   `gorm:"not null" json:"source_id"`
	Content   string `json:"content"`
	StartPage *uint  `json:"start_page"`
	EndPage   *uint  `json:"end_page"`
}

type QuotationWithSource struct {
	GormModel
	SourceID  uint `gorm:"not null" json:"source_id"`
	Source    Source
	Content   string `json:"content"`
	StartPage *uint  `json:"start_page"`
	EndPage   *uint  `json:"end_page"`
}
