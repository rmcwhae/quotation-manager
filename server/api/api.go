package api

import (
	"log"

	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/russellmcwhae/quotation-manager/database"
	"github.com/russellmcwhae/quotation-manager/model"
)

func FetchSources(c *gin.Context) {
	var sources []model.Source
	err := database.DB.Model(&model.Source{}).Order("updated_at desc").Find(&sources).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, sources)
}

func CreateSource(c *gin.Context) {
	var source model.Source
	if err := c.ShouldBindJSON(&source); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&source)

	c.JSON(200, source)
}

func EditSource(c *gin.Context) {
	var source model.Source
	if err := database.DB.First(&source, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := c.ShouldBindJSON(&source); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&source)

	c.JSON(200, source)
}

func DeleteSource(c *gin.Context) {
	var source model.Source
	if err := database.DB.First(&source, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	database.DB.Delete(&source)

	c.JSON(200, source)
}

func FetchAuthors(c *gin.Context) {
	var authors []model.Author
	err := database.DB.Model(&model.Author{}).Preload("Sources").Find(&authors).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, authors)
}

func CreateAuthor(c *gin.Context) {
	var author model.Author
	if err := c.ShouldBindJSON(&author); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&author)

	c.JSON(200, author)
}

func EditAuthor(c *gin.Context) {
	var author model.Author
	if err := database.DB.First(&author, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := c.ShouldBindJSON(&author); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Save(&author)

	c.JSON(200, author)
}

func DeleteAuthor(c *gin.Context) {
	var author model.Author
	if err := database.DB.First(&author, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	database.DB.Delete(&author)

	c.JSON(200, author)
}

func FetchQuotationsBySource(c *gin.Context) {
	var quotations []model.Quotation
	err := database.DB.Model(&model.Quotation{}).Where("source_id = ?", c.Param("id")).Find(&quotations).Error
	if err != nil {
		log.Print(err)
	}

	c.JSON(200, quotations)
}

func CreateQuotation(c *gin.Context) {
	var quotation model.Quotation
	if err := c.ShouldBindJSON(&quotation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	database.DB.Create(&quotation)

	c.JSON(200, quotation)
}

func EditQuotation(c *gin.Context) {
	var quotation model.Quotation
	if err := database.DB.First(&quotation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	if err := c.ShouldBindJSON(&quotation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, quotation)
}

func DeleteQuotation(c *gin.Context) {
	var quotation model.Quotation
	if err := database.DB.First(&quotation, c.Param("id")).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Record not found!"})
		return
	}

	database.DB.Delete(&quotation)

	c.JSON(200, quotation)
}
