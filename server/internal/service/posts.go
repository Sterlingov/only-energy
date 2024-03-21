package service

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
	"server/internal/database"
	"server/internal/models"
)

func GetPosts() []byte {
	var posts []models.Post = database.AllPosts()
	for i := range posts {
		posts[i].ImageUrl = fmt.Sprintf("http://%s/image/%s", os.Getenv("DOMAIN"), posts[i].ImageUrl)
	}
	b, err := json.Marshal(posts)
	if err != nil {
		log.Fatal(err)
	}
	return b
}
