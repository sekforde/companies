import dotenv from "dotenv"
import fs from 'fs';
import { Readable } from 'stream';
import { CompaniesHouseAPI } from "./CompaniesHouseAPI";
import { AdvancedSearchQuery } from "..";

dotenv.config()

export class CompanyReader extends Readable {
    query: AdvancedSearchQuery = {};
    limit: number = 10;
    key: string = '';
    ch: CompaniesHouseAPI;
    constructor(query: AdvancedSearchQuery = {}, limit: number = 10) {
        super({ objectMode: true });
        this.key = process.env.CH_KEY;
        this.query = query;
        this.limit = limit;
        this.ch = new CompaniesHouseAPI(this.key);
    }
    async _read() {
        const companies: any = await this.ch.findCompaniesAdvancedToLimit(this.query, 10);
        const cs = companies.items ? companies.items : companies;
        console.log('streaming', cs.length, 'companies');
        cs.forEach(c => this.push(c));
        this.push(null);
    }
}

