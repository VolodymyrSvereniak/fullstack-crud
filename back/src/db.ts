import pg from "pg";
import dotenv from "dotenv";

interface QueryProps {
  sql: string;
  params?: any[];
}

dotenv.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});
db.connect();

db.on("error", (err) => {
  console.error("Database error", err);
  process.exit(-1);
});

export const query = ({ sql, params }: QueryProps) => db.query(sql, params);
