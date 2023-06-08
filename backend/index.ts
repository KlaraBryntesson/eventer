import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { Client } from "pg";
import mime from "mime-types";

dotenv.config();

const client = new Client({
  database: process.env.PGDATABASE,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
  user: process.env.PGUSER,
});

client.connect();

const app: Application = express();

const port = process.env.PORT || 8080;
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "publicimages")));

app.use((req, res, next) => {
  const filePath = path.join(__dirname, "public", req.url);
  const contentType =
    mime.contentType(path.extname(filePath)) || "application/octet-stream";
  res.type(contentType);
  next();
});

app.get("/static/js/:filename", (req, res, next) => {
  const filePath = path.join(
    __dirname,
    "public",
    "static",
    "js",
    req.params.filename
  );
  res.set("Content-Type", "application/javascript");
  res.sendFile(filePath);
});

app.get(
  "/events",
  async (request: Request, response: Response, next: NextFunction) => {
    const { rows } = await client.query("SELECT * FROM events");
    if (rows.length === 0) {
      response.status(404).end();
    } else {
      response.status(200).send(rows);
    }
  }
);

app.get(
  "/events/:eventId",
  async (request: Request, response: Response, next: NextFunction) => {
    const { rows } = await client.query(
      "SELECT * FROM events WHERE id_name = $1",
      [request.params.eventId]
    );

    if (rows.length === 0) {
      response.status(404).end();
    } else {
      const event = rows[0];
      response.status(200).send(event);
    }
  }
);

app.get(
  "/openhours/:eventId",
  async (request: Request, response: Response, next: NextFunction) => {
    const { rows } = await client.query(
      "SELECT * FROM openhours WHERE event_id = $1",
      [request.params.eventId]
    );

    let event = null;
    if (rows.length === 0) {
      event = null;
      response.status(404).end();
    } else {
      event = rows[0];
      response.status(200).send(event);
    }
  }
);

app.listen(port, () => {
  console.log("Redo på " + port);
});
