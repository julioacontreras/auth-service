import fs from 'fs';

export function loadJson (filepath:string) {
    try {
        const rawdata = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(rawdata);       
    } catch (err) {
        return null;
    }
}
