import dotenv from "dotenv"
import { dBInit, queryAsObject } from "./lib/db";

dotenv.config()

const dbFile = process.env.DB_FILE;

async function main() {
    console.clear();

    const db = await loadDb();

    const results = await countData(db);
    console.table(results);
};

async function loadDb() {
    const db = await dBInit(dbFile);
    return db;
}

async function countData(db: any) {
    return queryAsObject("SELECT count(*) AS count FROM company");
}

main().catch(console.error);