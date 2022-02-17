import dotenv from "dotenv"
import fs from 'fs';
import { dBInit, queryAsObject } from "../lib/db";
import { loadCompanyData } from "./company.sql";
import { loadOfficerData } from "./officer.sql";
import { CompaniesHouseAPI } from "../lib/CompaniesHouseAPI";

dotenv.config()

const key = process.env.CH_KEY;
const dbFile = './data/db.bin';

async function main() {

    console.clear();

    const ch = new CompaniesHouseAPI(key);
    const db = await loadDb();

    // createTables(db);
    // await loadData(db, ch);
    // await countData(db);

    // companies
    const companies = await queryDb(db);
    console.log("companies query", companies.length);

    // officers
    const company0 = companies[0];
    console.log(company0);
    const officers = await loadOfficerData(ch, company0.number);
    console.log(JSON.stringify(officers, null, 2));
};

async function loadData(db: any, ch: CompaniesHouseAPI) {
    const statements = await loadCompanyData(ch);
    console.log('processing', statements.length);
    const errors: Error[] = await bulkInsert(db, statements);
    console.log('errors', errors.length);
    await saveDb(db);
}

async function countData(db: any) {
    const results = await queryAsObject("SELECT count(*) AS count FROM company");
    const count = results[0].count;
    console.log("companies: ", count);
}

async function queryDb(db: any) {
    const results = await queryAsObject("select * from company");
    return results;
    // console.log(results);
}

async function loadDb() {
    const db = await dBInit(dbFile);
    return db;
}

async function createTables(db: any) {
    const sqlText = fs.readFileSync('./src/sql/create.tables.sql').toString();
    db.exec(sqlText);
}

async function saveDb(db: any) {
    const exportedDb = await db.export();
    fs.writeFileSync(dbFile, Buffer.from(exportedDb));
}

async function bulkInsert(db: any, statements: string[]): Promise<Error[]> {
    const errors: Error[] = [];
    for (let i = 0; i < statements.length; i++) {
        try {
            await db.exec(statements[i]);
        } catch (e) {
            errors.push(e);
        }
    }
    return errors;
};

main().catch(console.error);