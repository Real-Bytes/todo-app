package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/ryanjb1/todo-app/server/router"
)

func main() {

	r := router.Router()

	fmt.Println("Starting server on port 8888...")

	log.Fatal(http.ListenAndServe(":8888", r))
}
