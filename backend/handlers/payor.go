package handlers

import (
	"go-api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (h *Handler) CreatePayor(c *gin.Context) {
	var payor models.Payor

	if err := c.ShouldBindJSON(&payor); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Data tidak valid: " + err.Error(),
		})
		return
	}

	_, err := h.DB.Exec(`
        INSERT INTO ASM_PAYOR
            (PAYOR_CODE, PAYOR_NAME, ADDRESS, PHONE, EMAIL, CONTACT_PERSON)
        VALUES
            (:1, :2, :3, :4, :5, :6)
    `,
		payor.PayorCode,
		payor.PayorName,
		payor.Address,
		payor.Phone,
		payor.Email,
		payor.ContactPerson,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Gagal simpan ke database: " + err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Payor berhasil didaftarkan",
	})
}
