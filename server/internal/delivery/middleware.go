package delivery

import (
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
