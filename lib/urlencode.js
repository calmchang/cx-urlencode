//cx-urlencode RFC 3986
var hexTable = (function() {
  var array = [];
  for (var i = 0; i < 256; ++i) {
    array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
  }

  return array;
}());

function urlencode(str) {
  if (str === null) return null;
  if (str.length === 0) {
    return str;
  }

  var string = typeof str === 'string' ? str : String(str);

  var out = '';
  for (var i = 0; i < string.length; ++i) {
    var c = string.charCodeAt(i);

    if (
      c === 0x2D || // -
      c === 0x2E || // .
      c === 0x5F || // _
      c === 0x7E || // ~
      (c >= 0x30 && c <= 0x39) || // 0-9
      (c >= 0x41 && c <= 0x5A) || // a-z
      (c >= 0x61 && c <= 0x7A) // A-Z
    ) {
      out += string.charAt(i);
      continue;
    }

    if (c < 0x80) {
      out = out + hexTable[c];
      continue;
    }

    if (c < 0x800) {
      out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
      continue;
    }

    if (c < 0xD800 || c >= 0xE000) {
      out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
      continue;
    }

    i += 1;
    c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
    out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
  }

  return out;
}

function urldecode(str) {
  return decodeURIComponent(str);
}


export default {
  urlencode:urlencode,
  urldecode:urldecode
};