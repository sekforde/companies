import companies from '../../data/companies.hp.json';

async function main() {

    console.clear();
    getTop10Words();
    getTop10Postcodes();
}


function getTop10Words() {
    const wordHash = {};
    companies
        .map(i => i.title)
        .forEach(n => (n.split(" ").forEach(w => (!wordHash[w]) ? wordHash[w] = 1 : wordHash[w]++)));

    const valueArr = [];
    Object.keys(wordHash).forEach(value => valueArr.push([value, wordHash[value]]));
    valueArr.sort((a, b) => b[1] - a[1]);
    const top10 = valueArr.splice(0, 10);

    console.table(top10);
}

function getTop10Postcodes() {
    const hash = {};
    companies
        .map(i => i.address.postal_code)
        .forEach((n: string) => {
            if (!n || n === '') return;
            const pc = n.replace(" ", "");
            !hash[pc] ? hash[pc] = 1 : hash[pc]++;
        });

    const valueArr = [];
    Object.keys(hash).forEach(value => valueArr.push([value, hash[value]]));
    valueArr.sort((a, b) => b[1] - a[1]);

    const top10 = valueArr.splice(0, 20);
    console.table(top10);
}


main().catch(console.error);
