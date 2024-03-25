package delivery

import (
	"log"
	"net/http"
	"os"
)

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		secretHeader := r.Header.Get("SuperSecretHeader")
		if secretHeader != os.Getenv("Secret_Header") {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		next(w, r)
	}
}

func LoggerMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s | %s | %s ", r.Method, r.RequestURI, r.Host)
		next(w, r)
	}
}
