package model

type Authority struct {
	Id        int    `json:"id"`
	Authority int    `json:"authority" gorm:"authority"`
	Name      string `json:"name" gorm:"name"`
}
