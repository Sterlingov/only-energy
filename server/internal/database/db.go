package database

import (
	"database/sql"
	"fmt"
	"os"
	"server/internal/models"

	_ "github.com/lib/pq"
)

func newConnection() *sql.DB {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", os.Getenv("POSTGRES_USER"), os.Getenv("POSTGRES_PASS"), os.Getenv("POSTGRES_DB"))
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		panic(err)
	}
	return db
}

func AllPosts() []models.Post {
	db := newConnection()
	defer db.Close()
	rows, err := db.Query("select * from posts")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	posts := []models.Post{}
	for rows.Next() {
		p := models.Post{}
		err := rows.Scan(&p.Id, &p.Name, &p.Description, &p.Price, &p.Mark, &p.ImageUrl)
		if err != nil {
			fmt.Println(err)
			continue
		}
		posts = append(posts, p)
	}
	return posts
}
