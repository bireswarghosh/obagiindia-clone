// Audit part 8: (a) 'obagi' hits inside junk span — visible or blob?
// (b) genome img occurrences, (c) story-image-1 vs collections-bg order,
// (d) social icon src uniqueness, (e) bgMedia_comp-lwz20kzt inner img tag.
import { readFileSync } from 'fs';
const html = readFileSync('public/obagi.html', 'utf8');

const junk = html.slice(1659539, 1697613);
console.log('--- obagi hits in junk span:');
for (const m of junk.matchAll(/obagi/gi)) {
  const abs = 1659539 + m.index;
  console.log(`  @${abs}: ...${JSON.stringify(html.slice(abs - 80, abs + 80))}...`);
}

console.log('\n--- genome occurrences:');
for (const m of html.matchAll(/genome-research-lab-tests/g)) console.log('  @' + m.index);

console.log('\n--- obagi-nu-derm-fx-collection alt occurrences (story1 vs collections bg):');
for (const m of html.matchAll(/alt="obagi-nu-derm-fx-collection"/g)) {
  console.log('  alt@' + m.index, '| tag start:', JSON.stringify(html.slice(html.lastIndexOf('<img', m.index), html.lastIndexOf('<img', m.index) + 60)));
}
console.log('story section [5] comp-lwrl1yo4 at 1608739; collections [4] at 1600088');

console.log('\n--- social src fragments unique?');
for (const f of ['11062b_ca1d837ce7194421b781ee7384061a8e', '11062b_30de4e7217e64dfdadc3ea03beea7b94',
  '11062b_362ef89dec51403eb0ee59a21bde967c', '11062b_e82f42804b3546dfa8e426e752b24542']) {
  console.log(' ', f.slice(0, 20), 'count:', html.split(f).length - 1);
}

console.log('\n--- bgMedia_comp-lwz20kzt inner:');
const bi = html.indexOf('id="bgMedia_comp-lwz20kzt"');
console.log(JSON.stringify(html.slice(bi, bi + 900)));
