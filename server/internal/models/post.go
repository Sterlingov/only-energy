package models

type Post struct {
	Id          int    `json:"id,omitempty"`
	Name        string `json:"name,omitempty"`
	Description string `json:"description,omitempty"`
	Price       int    `json:"price,omitempty"`
	Mark        int    `json:"mark,omitempty"`
	ImageUrl    string `json:"imageUrl"`
}
