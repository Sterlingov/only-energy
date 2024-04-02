package main

import (
	"log"
	"net/http"
	"os"
	"server/internal/delivery"

	"github.com/gorilla/handlers"
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
	m := mux.NewRouter()
	m.Methods("GET").Path("/posts").HandlerFunc(delivery.LoggerMiddleware(delivery.AuthMiddleware(delivery.GetPostsHandler)))
	m.Methods("GET").Path("/image/{imageId}").HandlerFunc(delivery.LoggerMiddleware(delivery.GetImageHandler))
	originsOk := handlers.AllowedOrigins([]string{"*"})
	methodsOk := handlers.AllowedMethods([]string{"GET", "OPTIONS"})
	headersOk := handlers.AllowedHeaders([]string{"Content-Type", "SuperSecretHeader"})
	serverAddr := os.Getenv("DOMAIN") + ":" + os.Getenv("PORT")
	if err := http.ListenAndServe(serverAddr, handlers.CORS(originsOk, methodsOk, headersOk)(m)); err != nil {
		log.Fatal(err)
	}
}
