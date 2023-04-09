const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { Client } = require("pg");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5003;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection
const client = new Client({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATABASE,
	sslmode: "require",
	ssl: {
		// ssl is required to connect to the database
		ca: fs.readFileSync("./ca-certificate.crt"),
	},
});

client.connect((err) => {
	if (err) {
		console.error("Error connecting to the database", err.stack);
	} else {
		console.log("Connected to the database successfully!");
	}
});

client
	.query(
		`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  )
`
	)
	.then(() => {
		console.log("Users table created successfully!");
	})
	.catch((error) => {
		console.error("Error creating users table:", error);
	});

client
	.query(
		`
  CREATE TABLE IF NOT EXISTS watchlist (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    media_id INTEGER NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`
	)
	.then(() => {
		console.log("Watchlist table created successfully!");
	})
	.catch((error) => {
		console.error("Error creating watchlist table:", error);
	});
app.get("/", (req, res) => {
	res.send("Welcome to the API!");
});

app.post("/register", (req, res) => {
	const { username, password } = req.body;
	client
		.query(
			`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING id
            `,
			[username, password]
		)
		.then((result) => {
			res.status(201).json({
				id: result.rows[0].id,
				username,
			});
		})
		.catch((error) => {
			console.error("Error registering user:", error);
			res.status(500).json({ error: "Error registering user" });
		});
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
