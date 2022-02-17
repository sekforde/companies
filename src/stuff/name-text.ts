import fs from 'fs';
import Jaccard from 'jaccard-index';

function cleanUp(name: string) {
    return name
        .replace(/[^a-zA-Z ]/g, "")
        .replace(" LIMITED", "")
        .replace(" LTD", "");
}

async function main() {
    const companies = JSON.parse(fs.readFileSync('./data/advanced.companies.json').toString());
    const logs = {};
    const companyHash = {};


    companies.forEach(async c => {
        const name = cleanUp(c.company_name);
        logs[c.company_number] = name.trim().split(' ').filter(w => w.length);
        companyHash[c.company_number] = c.company_name;
    });

    const items = Object.keys(logs);

    function showResult(links) {
        const filteredLinks = links.filter(l => l.value > 0.05);
        filteredLinks.sort((a, b) => a.value > b.value);
        filteredLinks.forEach(l => {
            l.sourceName = companyHash[l.source];
            l.targetName = companyHash[l.target];
        });
        console.table(filteredLinks);
    }

    const options = { getLog: async (item) => logs[item] };

    const links = await Jaccard(options).getLinks(items);

    showResult(links);
}

main().catch(console.error);
