let crawler = require('./utils/crawler');

let domain = 'https://www.jkforum.net/';
let base =
  domain +
  'home.php?mod=space&uid=2199928&do=thread&view=me&type=thread&order=dateline&from=space&page=';

let sta = 21;
let end = 30;

let urls = [];
for (let i = sta; i <= end; i++) {
  let url = base + i;
  urls.push(url);
}

crawler({
  url: urls,
  headers: ['Date', 'Name', 'Link'],
  getData($, current) {
    let elements = [];

    let table = $('table');
    let list = table.find('tr').not('[class]');
    list.each((index, element) => {
      let td = $(element).find('td');
      let date = td.eq(2).find('em').text();

      let th = $(element).find('th').find('a');
      let name = th.text();
      let link = th.attr('href');

      elements.push([
        `<span>${date}</span>`,
        `<span>${name}</span>`,
        `<a href="${domain + link}" target="_blank">${link}</a>`,
      ]);
    });

    console.log(current, list.length);
    return elements;
  },
});
