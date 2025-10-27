import { query } from "../db.js";

interface Client {
  name: string;
  email: string;
  job: string;
  rate: number;
  isActive: boolean;
}

export const getClients = async () => {
  const clients = await query({
    sql: "SELECT * FROM public.clients_tb ORDER BY id ASC",
  });
  return clients.rows;
};

export const createClient = async (client: Client) => {
  const { name, email, job, rate, isActive } = client;

  const clients = await query({
    sql: "INSERT INTO clients_tb (name, email, job, rate, isActive) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    params: [name, email, job, rate, isActive],
  });
  return clients.rows[0];
};

export const updateClient = async (id: number, client: Client) => {
  const { name, email, job, rate, isActive } = client;
  const clients = await query({
    sql: "UPDATE clients_tb SET name = $1, email = $2, job = $3, rate = $4, isActive = $5 WHERE id = $6 RETURNING *",
    params: [name, email, job, rate, isActive, id],
  });
  return clients.rows[0];
};

export const deleteClient = async (id: number) => {
  const clients = await query({
    sql: "DELETE FROM clients_tb WHERE id = $1 RETURNING *",
    params: [id],
  });
  return clients.rows[0];
};

export const searchClientsByName = async (name: string) => {
  const clients = await query({
    sql: "SELECT * FROM public.clients_tb WHERE name ILIKE $1 ORDER BY id ASC",
    params: [`%${name}%`],
  });
  return clients.rows;
};
