package main

import (
	"time"

	"gorm.io/gorm"
)

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
