import { Transform } from 'stream';

export class DataTransformer extends Transform {
    constructor() {
        super({ objectMode: true });
    }
    _transform(data, enc, callback) {
        this.push(data);
        // this.push(JSON.stringify(data, null, 2));
        callback();
    };
}

