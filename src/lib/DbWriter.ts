import fs from 'fs';
import { Writable } from 'stream';
import { dBInit } from "./db";

const dbFile: string = './data/db.bin';

export class DbWriter extends Writable {
    db: any;
    constructor() {
        super({ objectMode: true });
    }

    async init() {
        this.db = await this.loadDb();
    }

    async loadDb(): Promise<any> {
        return dBInit(dbFile);
    }

    async saveDb(db: any): Promise<void> {
        const exportedDb = await db.export();
        fs.writeFileSync(dbFile, Buffer.from(exportedDb));
    }

    async _write(c, encoding, callback) {
        const a: any = c.registered_office_address;
        const dc: string = c.date_of_cessation || "";

        const statement: string = `INSERT INTO company 
        (name, number, status, type, creationDate, cessationDate, address1, address2, locality, postcode, country)
        VALUES (
        "${c.company_name}", 
        "${c.company_number}", 
        "${c.company_status}", 
        "${c.company_type}", 
        "${c.date_of_creation}", 
        "${dc}", 
        "${a.address_line_1}", 
        "${a.address_line_2}", 
        "${a.locality}", 
        "${a.postal_code}", 
        "${a.country}"
        );`;

        try {
            await this.db.exec(statement);
            process.stdout.write('+');
            callback();
        } catch (e) {
            if (e.message.includes('UNIQUE constraint failed')) {
                process.stdout.write('-');
                return callback();
            }
            process.stdout.write('!');
            callback(e);
        }

    }
}
