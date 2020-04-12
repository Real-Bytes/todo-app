package main

import (
	"fmt"
	"net/http"

	"github.com/ryanjb1/todo-app/server/router"
)

func main() {

	r := router.Router()

	fmt.Println("Starting server on port 8888...")

	http.ListenAndServe(":8888", r)
}
