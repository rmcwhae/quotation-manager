package model

import (
	"time"

	"gorm.io/gorm"
)

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
	Quotation
	Source Source `json:"source"`
}
