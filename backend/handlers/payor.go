package handlers

import (
	"go-api/models"
	"net/http"
	"time"

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

	startDate, err := time.Parse("02/01/2006", payor.StartDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Format StartDate tidak valid, gunakan DD/MM/YYYY",
		})
		return
	}

	endDate, err := time.Parse("02/01/2006", payor.EndDate)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Format EndDate tidak valid, gunakan DD/MM/YYYY",
		})
		return
	}

	oracleStartDate := startDate.Format("02-Jan-06")
	oracleEndDate := endDate.Format("02-Jan-06")

	_, err = h.DB.Exec(`
    INSERT INTO POOLDATA.T_ENROLL_REGIST_PAYOR
    (KODE_PAYOR, NAMA_PAYOR, ALAMAT, NO_TELEPON, EMAIL, KONTAK_PIC, POLICY_NO, START_DATE, END_DATE)
    VALUES (:1, :2, :3, :4, :5, :6, :7, TO_DATE(:8, 'DD-MON-RR'), TO_DATE(:9, 'DD-MON-RR'))
`,
		payor.PayorCode,
		payor.PayorName,
		payor.Address,
		payor.Phone,
		payor.Email,
		payor.ContactPerson,
		payor.PolicyNo,
		oracleStartDate,
		oracleEndDate,
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
