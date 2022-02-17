import axios, { AxiosRequestConfig, Method } from 'axios';
import { flattenDiagnosticMessageText } from 'typescript';
import URL from 'url';

const _baseUrl = 'https://api.company-information.service.gov.uk';

export class APIRequest {
    key: string = '';
    baseUrl: string = '';
    constructor(key = '', baseUrl = _baseUrl) {
        this.key = key;
        this.baseUrl = baseUrl;
    }
    async request(path: string, query = {}, method: Method = 'GET', opts: any = {}) {
        const params = new URL.URLSearchParams(query);
        const url = `${this.baseUrl}${path}?${params.toString()}`;
        const options: AxiosRequestConfig = {
            ...opts,
            url,
            method,
            headers: {
                Authorization: this.key
            }
        };
        const results = await axios(options);
        return results.data;
    }
}
