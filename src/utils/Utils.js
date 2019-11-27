export const formatDate = date => {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
};

export const getDay = date => {
  var day = date.getDate();

  return day;
};

export const getMonth = date => {
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  var monthIndex = date.getMonth();

  return monthNames[monthIndex];
};

export const getYear = date => {
  var year = date.getFullYear();

  return year;
};

function trimString(s) {
  var l = 0,
    r = s.length - 1;
  while (l < s.length && s[l] === " ") l++;
  while (r > l && s[r] === " ") r -= 1;
  return s.substring(l, r + 1);
}

function compareObjects(o1, o2) {
  var k = "";
  for (k in o1) if (o1[k] !== o2[k]) return false;
  for (k in o2) if (o1[k] !== o2[k]) return false;
  return true;
}

function itemExists(haystack, needle) {
  for (var i = 0; i < haystack.length; i++)
    if (compareObjects(haystack[i], needle)) return true;
  return false;
}

export function searchAny(objects, toSearch) {
  var results = [];
  toSearch = trimString(toSearch); // trim it
  for (var i = 0; i < objects.length; i++) {
    for (var key in objects[i]) {
      if (objects[i][key].indexOf(toSearch) !== -1) {
        if (!itemExists(results, objects[i])) results.push(objects[i]);
      }
    }
  }
  return results;
}
