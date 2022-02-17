import { CompaniesHouseAPI, AdvancedSearchQuery } from "../lib/CompaniesHouseAPI";

export async function loadOfficerData(ch: CompaniesHouseAPI, companyId: string): Promise<string[]> {

  const officers: any = await ch.listOfficers(companyId);
  // console.log(officers);

  // const statements: string[] = officers.items.map(c => {
  //     const a = c.registered_office_address;
  //     const dc = c.date_of_cessation || "";
  //     return `INSERT INTO company 
  //     (name, number, status,
  //     type, creationDate, cessationDate,
  //     address1, address2, locality, postcode, country)
  //     VALUES (
  //     "${c.company_name}", 
  //     "${c.company_number}", 
  //     "${c.company_status}", 
  //     "${c.company_type}", 
  //     "${c.date_of_creation}", 
  //     "${dc}", 
  //     "${a.address_line_1}", 
  //     "${a.address_line_2}", 
  //     "${a.locality}", 
  //     "${a.postal_code}", 
  //     "${a.country}"
  //     );`;
  // });

  // return statements;
  return officers;
}

/*
{
  "etag": "58dc5c228bda637131191467d1afd4f8cc69e0af",
  "active_count": 0,
  "items": [
    {
      "country_of_residence": "United Kingdom",
      "date_of_birth": {
        "year": 1998,
        "month": 6
      },
      "links": {
        "self": "/company/11128334/appointments/xwWAkSrwfz7SeoSAs_hauuwyhoE",
        "officer": {
          "appointments": "/officers/N6ycWyLXctumOgT50jpAwDQDE1k/appointments"
        }
      },
      "nationality": "Hungarian",
      "address": {
        "locality": "Ilford",
        "premises": "338",
        "country": "United Kingdom",
        "postal_code": "IG1 3TY",
        "address_line_1": "Wanstead Park Road"
      },
      "name": "MUHI, Archibald",
      "officer_role": "director",
      "appointed_on": "2018-01-02",
      "occupation": "Builder"
    }
  ],
  "inactive_count": 1,
  "items_per_page": 35,
  "start_index": 0,
  "resigned_count": 0,
  "links": {
    "self": "/company/11128334/officers"
  },
  "total_results": 1,
  "kind": "officer-list"
}
*/