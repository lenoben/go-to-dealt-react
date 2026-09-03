package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

type Todo struct {
	ID        int    `json:"_id"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

var db *pgxpool.Pool

func main() {

	if os.Getenv("ENV") != "production" {
		err := godotenv.Load(".env")
		if err != nil {
			log.Fatal(err)
		}
	}

	DATABASE_URL := os.Getenv("DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), DATABASE_URL)
	if err != nil {
		log.Fatal(err)
	}
	defer pool.Close()

	if err := pool.Ping(context.Background()); err != nil {
		log.Fatal(err)
	}

	db = pool

	fmt.Println("connection established")

	_, err = db.Exec(context.Background(), `
		CREATE TABLE IF NOT EXISTS todos (
			id SERIAL PRIMARY KEY,
			completed BOOLEAN NOT NULL DEFAULT false,
			body TEXT NOT NULL
		)
	`)
	if err != nil {
		log.Fatal(err)
	}

	app := fiber.New()

	if os.Getenv("ENV") == "production" {
		app.Static("/", "client/dist")
	} else {
		app.Use(cors.New(cors.Config{
			AllowOrigins: "http://localhost:5173",
			AllowHeaders: "Accept, Authorization, Origin, Content-Type",
			AllowMethods: "GET, POST, PATCH, DELETE",
		}))
	}

	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Patch("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000" // Default fallback
	}

	var addr string
	if os.Getenv("ENV") == "development" {
		addr = ":" + port
	} else {
		addr = "0.0.0.0:" + port
	}

	log.Fatal(app.Listen(addr))
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	rows, err := db.Query(context.Background(), "SELECT id, completed, body FROM todos ORDER BY id")
	if err != nil {
		return err
	}
	defer rows.Close()

	for rows.Next() {
		var todo Todo
		if err := rows.Scan(&todo.ID, &todo.Completed, &todo.Body); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	if err := rows.Err(); err != nil {
		return err
	}

	return c.JSON(todos)
}
func createTodo(c *fiber.Ctx) error {
	todo := new(Todo)
	if err := c.BodyParser(todo); err != nil {
		return err
	}

	if todo.Body == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Todo body is empty"})
	}

	err := db.QueryRow(
		context.Background(),
		"INSERT INTO todos (completed, body) VALUES ($1, $2) RETURNING id",
		todo.Completed, todo.Body,
	).Scan(&todo.ID)
	if err != nil {
		return err
	}

	return c.Status(201).JSON(todo)
}
func updateTodo(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid id"})
	}

	_, err = db.Exec(context.Background(), "UPDATE todos SET completed = true WHERE id = $1", id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
func deleteTodo(c *fiber.Ctx) error {
	id, err := strconv.Atoi(c.Params("id"))
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "invalid id"})
	}

	_, err = db.Exec(context.Background(), "DELETE FROM todos WHERE id = $1", id)
	if err != nil {
		return err
	}

	return c.Status(200).JSON(fiber.Map{"success": true})
}
