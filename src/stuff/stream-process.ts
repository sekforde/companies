import csv from 'csv-stream';
import fs from 'fs';
import { Transform } from 'stream';
import moment from 'moment';

const statusHash = {};
/*
{
  Active: 'active',
  Liquidation: 'liquidation',
  'Active - Proposal to Strike off': 'proposalToStrike',
  'ADMINISTRATION ORDER': 'administrationOrder',
  'Voluntary Arrangement': 'voluntaryArrangement',
  'In Administration': 'inAdminitration',
  'In Administration/Administrative Receiver': 'administrativeReceiver',
  'Live but Receiver Manager on at least one charge': 'oneCharge',
  'In Administration/Receiver Manager': 'receiverManager',
  RECEIVERSHIP: 'receivership',
  'ADMINISTRATIVE RECEIVER': 'administrativeReceiver',
  'RECEIVER MANAGER / ADMINISTRATIVE RECEIVER': 'administrativeReceiverManager',
  'VOLUNTARY ARRANGEMENT / ADMINISTRATIVE RECEIVER': 'voluntaryArrangement'
}
*/

class Filter extends Transform {
    rowCount: number = 0;
    constructor() {
        super({ objectMode: true });
    }
    _transform(data, enc, callback) {

        // console.log(data);
        const incorporationDate = moment(data['IncorporationDate'], "DD/MM/YYYY");
        const dissolutionDate = data['DissolutionDate'].length ? moment(data['DissolutionDate'], "DD/MM/YYYY") : null;

        const row = {
            name: data['CompanyName'],
            number: data[' CompanyNumber'],
            town: data['RegAddress.PostTown'],
            postcode: data['RegAddress.PostCode'],
            status: data['CompanyStatus'],
            dissolutionDateStr: data['DissolutionDate'],
            dissolutionDate: dissolutionDate ? dissolutionDate.toDate() : null,
            dissolutionMonth: dissolutionDate ? dissolutionDate.format("YYYYMM") : null,
            incorporationDateStr: data['IncorporationDate'],
            incorporationDate: incorporationDate.toDate(),
            incorporationMonth: incorporationDate.format("YYYYMM")
        };
        if (!statusHash[row.status]) statusHash[row.status] = 0;
        statusHash[row.status]++;

        this.rowCount++;
        if (this.rowCount / 1000000 === Math.floor(this.rowCount / 1000000)) {
            console.log(this.rowCount);
            console.log(statusHash);
        }
        if (data['DissolutionDate'] !== '') {
            console.log(this.rowCount);
            console.log(row);
            // if (this.rowCount > 20) {
            process.exit();
        }
        this.push(JSON.stringify(row, null, 2));
        callback();
    };
}

async function main() {
    console.clear();

    const options = {
        endLine: '\n',
        enclosedChar: '"'
    }

    const readStream = fs.createReadStream('./data/BasicCompanyDataAsOneFile-2022-02-01.csv');
    const csvStream = csv.createStream(options);
    const filter = new Filter();
    const writeStream = fs.createWriteStream('./data/output.json');

    readStream
        .pipe(csvStream)
        .pipe(filter)
        .pipe(writeStream);

}

main().catch(console.error);
