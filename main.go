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

	// r.POST("/sources", CreateSource)
	// r.GET("/sources", GetSources)
	// r.PUT("/sources/:id", UpdateSource)
	// r.GET("/quotations", GetQuotations)
	// r.POST("/quotations", CreateQuotation)
	// r.PUT("/quotations/:id", UpdateQuotation)

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
	Title  string  `json:"title"`
	Author string  `json:"author"`
	Url    *string `json:"url"`
}

type Quotation struct {
	GormModel
	SourceID  uint   `json:"source_id"`
	Content   string `json:"content"`
	StartPage *uint  `json:"start_page"`
	EndPage   *uint  `json:"end_page"`
}
