package service

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"server/internal/database"
	"server/internal/models"
)

func GetPosts(r *http.Request) []byte {
	var posts []models.Post
	query := r.URL.Query().Get("search")
	if query == "" {
		posts = database.AllPosts()
	} else {
		posts = database.SearchPosts(query)
	}
	for i := range posts {
		posts[i].ImageUrl = fmt.Sprintf("http://%s/image/%s", os.Getenv("DOMAIN"), posts[i].ImageUrl)
	}
	b, err := json.Marshal(posts)
	if err != nil {
		log.Fatal(err)
	}
	return b
}
