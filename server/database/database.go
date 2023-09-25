package database

import (
	"log"

	"github.com/russellmcwhae/quotation-manager/model"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func SetupDB() {
	// Setup database
	db, err := gorm.Open(sqlite.Open("quotations.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	err = db.AutoMigrate(&model.Source{}, &model.Quotation{})
	if err != nil {
		log.Printf("Error migrating models: %v", err)
	}

	DB = db
}
