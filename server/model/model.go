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

type Author struct {
	GormModel
	Name    string   `json:"name"`
	Sources []Source `gorm:"foreignKey:AuthorID" json:"sources"`
}

type Source struct {
	GormModel
	Title           string      `json:"title"`
	AuthorID        uint        `json:"author_id"`
	Url             *string     `json:"url"`
	PublicationYear *uint       `json:"publication_year"`
	Quotations      []Quotation `gorm:"foreignKey:SourceID" json:",omitempty"`
}

type Quotation struct {
	GormModel
	SourceID  uint   `gorm:"not null" json:"source_id"`
	Content   string `json:"content"`
	StartPage *uint  `json:"start_page"`
	EndPage   *uint  `json:"end_page"`
}
