import pg from "pg";
import dotenv from "dotenv";
dotenv.config();
const client = new pg.Client({
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    host: `${process.env.HOST}`,
    port: `${process.env.PORT}`,
    database: `${process.env.DATABASE}`
});
export default client;

const createTable = `
    CREATE TABLE IF NOT EXISTS people (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        is_vaccinated BOOLEAN,
        birthdate TIMESTAMP NOT NULL,
        gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other'))
    )
`;
export { createTable };