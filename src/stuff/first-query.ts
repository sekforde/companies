import dotenv from "dotenv"
import { CompaniesHouseAPI, AdvancedSearchQuery } from "../lib/CompaniesHouseAPI";

dotenv.config()

const key = process.env.CH_KEY;

async function main() {
    console.clear();

    const ch = new CompaniesHouseAPI(key);

    const query: AdvancedSearchQuery = {
        location: 'wanstead',
        incorporated_from: '2020-01-01',
        // incorporated_to?: Date;
        // company_status: 'dissolved',
        // dissolved_from?: Date;
        // dissolved_to?: Date;
        size: 10
    }

    const companies: any = await ch.findCompaniesAdvanced(query);
    console.log(JSON.stringify(companies.items, null, 2));
    // const companies: any[] = await ch.findCompaniesAdvancedToLimit(query, 200);
    // console.log(companies.length);
    // displayCompaniesTable(companies.items);
}

function displayCompaniesTable(companies) {
    const table = companies.map(i => {
        return [
            i.date_of_creation,
            i.company_status,
            i.company_number,
            i.company_name,
            formatAddress(i.registered_office_address)
        ]
    }); //.filter(c => c[4].toLowerCase().includes('cambridge house'));
    console.table(table);
}

function formatAddress(rAddress: any) {
    return Object.keys(rAddress).map(k => rAddress[k]).join(', ');
}

main().catch(console.error);
