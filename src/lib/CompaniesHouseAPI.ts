import { APIRequest } from './Request';
import { AdvancedSearchQuery, SearchQuery, AlphabetSearchQuery } from "..";

export class CompaniesHouseAPI extends APIRequest {
    constructor(key: string) {
        super(key);
    }

    // Registered Address
    getRegisteredAddress(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/registered-office-address`);
    }
    // search API
    findCompaniesAdvanced(query: AdvancedSearchQuery): Promise<any> {
        return this.request('/advanced-search/companies', query);
    }
    async findCompaniesAdvancedToLimit(query: any = {}, limit: number = 100): Promise<any[]> {
        const rQuery = { ...query };
        rQuery.start_index = 0;
        rQuery.size = rQuery.size || 20;
        const results = [];
        let run = true;
        while (run) {
            const data = await this.findCompaniesAdvanced(rQuery).catch(err => {
                console.log('fetch error');
                run = false
            });
            if (data.items.length) {
                results.push(...data.items);
                rQuery.start_index += rQuery.size;
            }
            if (data.items.length === 0) {
                // no results
                run = false;
            }
            if (data.items.length < rQuery.size) {
                // last page because less than page size
                run = false;
            }
            if (results.length >= limit) {
                // we've got all the results we want
                run = false;
            }
        }
        return results;
    }
    findCompanies(query: SearchQuery): Promise<any> {
        return this.request('/search', query);
    }
    findOfficers(query: SearchQuery): Promise<any> {
        return this.request('/company/officers', query);
    }
    findDisqualifiedOfficers(query: SearchQuery): Promise<any> {
        return this.request('/search/disqualified-officers', query);
    }
    findCompaniesAlphabetically(query: AlphabetSearchQuery): Promise<any> {
        return this.request('/alphabetic-search/companies', query);
    }
    findDissolvedCompanies(query: AlphabetSearchQuery): Promise<any> {
        return this.request('/dissolved-search/companies', query);
    }
    // Officers API
    listOfficers(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/officers`);
    }
    getOfficers(companyId: string, appointmentId: string): Promise<any> {
        return this.request(`/company/${companyId}/appointments/${appointmentId}`);
    }
    // Registers API
    getRegisters(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/registers`);
    }
    // Charges API    
    listCharges(companyId: string, appointmentId: string): Promise<any> {
        return this.request(`/company/${companyId}/appointments/${appointmentId}`);
    }
    getCharges(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/charges`);
    }
    // Filing API
    listFilings(companyId: string, transactionId: string): Promise<any> {
        return this.request(`/company/${companyId}/filing-history/${transactionId}`);
    }
    getFilings(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/filing-history`);
    }
    // Insolvency API
    getInsolvency(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/insolvency`);
    }
    // Exemptions API
    getExemptions(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/exemptions`);
    }
    // Disqualifications API
    getCorporateOfficersDisqualifications(officerId: string): Promise<any> {
        return this.request(`/disqualified-officers/corporate/${officerId}`);
    }
    getNaturalOfficersDisqualifications(officerId: string): Promise<any> {
        return this.request(`/disqualified-officers/natural/${officerId}`);
    }
    // Appointments API    
    listOfficerAppointment(officerId: string): Promise<any> {
        return this.request(`/officers/${officerId}/appointments`);
    }
    // Estabilishments API
    getCorporateEntities(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/uk-establishments`);
    }
    // significant control API
    getPSCCorporateEntities(companyId: string, pscId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control/corporate-entity/${pscId}`);
    }
    getIndividual(companyId: string, pscId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control/individual/${pscId}`);
    }
    getLegalPersons(companyId: string, pscId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control/legal-person/${pscId}`);
    }
    getStatement(companyId: string, statementId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control/${statementId}`);
    }
    getSuperSecurePerson(companyId: string, superSecureId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control/super-secure/${superSecureId}`);
    }
    listSignificantPersons(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control`);
    }
    listSignificantPersonsStatements(companyId: string): Promise<any> {
        return this.request(`/company/${companyId}/persons-with-significant-control-statements`);
    }

    async getCompaniesResults(q: string, count: number): Promise<any[]> {

        const companies: any[] = [];
        const pages = count / 100;

        for (let i = 0; i < pages; i++) {
            const results = await this.findCompanies({
                q,
                items_per_page: 100,
                start_index: i * 100
            });
            results.items.forEach(r => companies.push(r));
        }

        return companies;
    }

}
