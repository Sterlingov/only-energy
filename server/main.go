package main

import (
	"log"
	"net/http"
	"server/internal/delivery"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func init() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	log.Print("Server started")
	r := mux.NewRouter()
	r.Methods("GET").Path("/posts").HandlerFunc(delivery.AuthMiddleware(delivery.GetPosts))
	if err := http.ListenAndServe(":9000", r); err != nil {
		log.Fatal(err)
	}
}
