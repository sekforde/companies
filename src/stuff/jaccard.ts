import companies from '../../data/companies.hp.json';
import Jaccard from 'jaccard-index';

async function main() {
    console.clear();

    const logs = {
        "item1": ["user1", "user2"],
        "item2": ["user2", "user3", "user4"],
        "item3": ["user1", "user2", "user5"]
    };

    const items = Object.keys(logs);    // item1, item2, item3

    const options = { getLog };

    const links = await Jaccard({ getLog }).getLinks(items);
    // .then(showResult).catch(console.warn);

    function getLog(item) {
        return Promise.resolve(logs[item]); // async loading
        // return logs[item]; // sync loading
    }

    function showResult(links) {
        console.log(JSON.stringify(links, null, 2));
        process.exit(0);
    }

}

main().catch(console.error);
