package main

import (
	"fmt"
	"net/http"
	"time"
)
	
func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello World! %s", time.Now())
}
	
func main() {
	fmt.Println("running... http://127.0.0.1:8080")
	http.HandleFunc("/", greet)
	http.ListenAndServe(":8080", nil)
}