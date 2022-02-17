import dotenv from "dotenv"
import { CompaniesHouseAPI } from "../lib/CompaniesHouseAPI";

dotenv.config()

const key = process.env.CH_KEY;

async function main() {
  console.clear();

  const ch = new CompaniesHouseAPI(key);

  // const companies: any[] = await ch.getCompaniesResults('hp', 200);  
  // console.log(companies.length);

  const officers = await ch.listOfficers('11409535');
  console.log(JSON.stringify(officers, null, 2));
}

function displayCompaniesTable(companies) {
  const table = companies.items.map(i => {
    return [
      i.date_of_creation,
      i.company_status,
      i.company_number,
      i.title,
      i.address_snippet //.split(',').join('\n')
    ]
  })
  console.log(JSON.stringify(companies, null, 2));
}

main().catch(console.error);
