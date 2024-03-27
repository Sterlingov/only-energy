package delivery

import (
	"net/http"
	"server/internal/service"

	"github.com/gorilla/mux"
)

func GetPostsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json; charset=UTF-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(service.GetPosts())
}

func GetImageHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	imageId := vars["imageId"]
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(service.GetImage(imageId))
}
