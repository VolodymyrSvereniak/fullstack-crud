import pg from "pg";
import dotenv from "dotenv";

interface QueryProps {
  sql: string;
  params?: any[];
}

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const db = new pg.Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect();

db.on("error", (err) => {
  console.error("Database error", err);
  process.exit(-1);
});

export const query = ({ sql, params }: QueryProps) => db.query(sql, params);
