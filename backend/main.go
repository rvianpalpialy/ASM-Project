package main

import (
	"database/sql"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/godror/godror"

	"go-api/handlers"
	"go-api/routes"
)

func main() {
	db, err := sql.Open("godror", "user/pass@localhost:1521/ORCL")
	if err != nil {
		log.Fatal("Gagal konek Oracle:", err)
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Fatal("Oracle tidak bisa di-ping:", err)
	}
	log.Println("Koneksi Oracle berhasil!")

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5174"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Content-Type"},
	}))

	h := handlers.NewHandler(db)
	routes.Register(r, h)

	log.Println("Server jalan di http://localhost:8080")
	r.Run(":8080")
}
