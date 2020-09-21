var BASE_HEXADECIMAL = 16;
var LENGTH_HEXADECIMAL = 4;

var BASE_BINARY = 2;
var LENGTH_BINARY = 16;

var BASE_DECIMAL = 10;
var LENGTH_DECIMAL = 5;

function chars(value) {
    return value.toString().split('');
};

function encode(value, length, base) {
    return chars(value).map(function (data) {
        return leftPad(data.charCodeAt(0).toString(base), length, '0');
    }).join('');
};

function leftPad(value, length) {
    var char = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ' ';

    var result = value;
    var newchar = String(char);

    if (newchar.length > 1) {
        newchar = substr(newchar, 0, 1);
    }

    var newlength = length - value.length;
    result = append(repeat(newchar, newlength), result);

    return result;
};

function substr(value, start) {
    var length = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    return value.substr(start, length);
};

function append(value) {
    for (var _len = arguments.length, appends = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        appends[_key - 1] = arguments[_key];
    }

    return appendArray(value, appends);
};

function appendArray(value) {
    var appends = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (appends.length === 0) {
        return value;
    }
    return value + appends.join('');
};


function repeat(value, multiplier) {
    var i = 0;
    var result = '';
    while (multiplier > i) {
        result += value;
        i += 1;
    }
    return result;
};

function hexEncode(value) {
    return encode(value, LENGTH_HEXADECIMAL, BASE_HEXADECIMAL);
};

function hexDecode(value, length, base) {
    return value.match(new RegExp('.{1,' + length + '}', 'g')).map(function (string) {
        return String.fromCharCode(parseInt(string, base));
    }).join('');
};