import { CompanyReader } from './lib/CompanyReader';
import { DataTransformer } from './lib/DataTransformer';
import { DbWriter } from './lib/DbWriter';
import { AdvancedSearchQuery } from ".";

async function main() {

    console.log('####################');

    const query: AdvancedSearchQuery = {
        location: 'wanstead',
        incorporated_from: '2018-01-01',
        size: 10
    };

    const reader = new CompanyReader(query);
    const transformer = new DataTransformer();
    const writer = new DbWriter();

    await writer.init();
    writer.on('finish', () => console.log());

    reader
        .pipe(transformer)
        .pipe(writer);

}

main().catch(console.error);
