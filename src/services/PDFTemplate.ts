import * as fs from 'fs';
import * as pdf from 'html-pdf';

const html = fs.readFileSync('./template.html', 'utf8');

console.log(__dirname);

pdf
  .create(html, { format: 'A4', type: 'pdf', border: { top: '1in', bottom: '1in' } })
  .toFile('./template.pdf', (err, pdf) => {});
