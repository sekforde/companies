import { CompaniesHouseAPI } from "../lib/CompaniesHouseAPI";
import { AdvancedSearchQuery } from "..";

export async function loadCompanyData(ch: CompaniesHouseAPI): Promise<string[]> {

    const query: AdvancedSearchQuery = {
        location: 'wanstead',
        incorporated_from: '2018-01-01',
        size: 200
    }

    // const companies: any = await ch.findCompaniesAdvanced(query);
    const companies: any = await ch.findCompaniesAdvancedToLimit(query, 2000);

    const cs = companies.items ? companies.items : companies;

    const statements: string[] = cs.map(c => {
        const a = c.registered_office_address;
        const dc = c.date_of_cessation || "";
        return `INSERT INTO company 
        (name, number, status,
        type, creationDate, cessationDate,
        address1, address2, locality, postcode, country)
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
    });

    return statements;
}