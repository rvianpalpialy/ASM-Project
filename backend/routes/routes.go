package routes

import (
	"go-api/handlers"

	"github.com/gin-gonic/gin"
)

func Register(r *gin.Engine, h *handlers.Handler) {
	api := r.Group("/api")
	{
		api.POST("/payor", h.CreatePayor)
	}
}
