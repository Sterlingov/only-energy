package service

import (
	"fmt"
	"os"
)

func GetImage(imageId string) []byte {
	fileBytes, err := os.ReadFile(fmt.Sprintf("../images/%s", imageId))
	if err != nil {
		panic(err)
	}
	return fileBytes
}
