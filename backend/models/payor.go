package models

type Payor struct {
    PayorCode     string `json:"payorCode"     binding:"required"`
    PayorName     string `json:"payorName"     binding:"required"`
    Address       string `json:"address"`
    Phone         string `json:"phone"`
    Email         string `json:"email"`
    ContactPerson string `json:"contactPerson"`
}