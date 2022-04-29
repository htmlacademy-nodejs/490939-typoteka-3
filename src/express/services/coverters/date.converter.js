'use strict';

// in: "24.01.2022, 16:47:27"
// out: "2022-01-24T16:47:27"
function date2HtmlFormat(str, includeTime = false) {
  const [d, t] = str.split(`, `);
  const [dd, mm, yyyy] = d.split(`.`);
  return `${yyyy}-${mm}-${dd}${includeTime ? `T${t}` : ``}`;
}

// in: "2022-01-24"
// out: "24.01.2022, 00:00"
function date2ApiFormat(str) {
  const [yyyy, mm, dd] = str.split(`-`);
  // TODO: need to get actual time
  const t = `00:00`;
  return `${dd}.${mm}.${yyyy}, ${t}`;
}

module.exports = {date2HtmlFormat, date2ApiFormat};
