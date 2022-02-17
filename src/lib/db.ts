import initSqlJs from 'sql.js';
import fs from 'fs';

let _db;
let SQL;

export async function dBInit(dbFile: string) {
    // initialise
    SQL = await initSqlJs();

    if (dbFile) {
        console.log(`Loading from disk ${dbFile}`);
        const filebuffer = fs.readFileSync(dbFile);
        _db = new SQL.Database(filebuffer);
        console.log("Data Loaded");
    } else {
        _db = new SQL.Database();
    }

    return _db;
};

export async function db() {
    console.log("returning", _db);
    return _db;
};

export async function queryAsObject(sql) {
    const stmt = await _db.prepare(sql);
    const columns = await stmt.getColumnNames();
    const arr = [];
    while (stmt.step()) {
        const row = stmt.get();
        const obj = {};
        row.forEach((value, index) => (obj[columns[index]] = value));
        arr.push(obj);
    }
    stmt.free();
    return arr;
};

export async function queryAsRows(sql) {
    const arr = await _db.exec(sql);
    return arr;
};
