// initialize the constants for html elements id
const toEncrypt_ = "to_encrypt"
const encryptKey_ = "en_key"
const encryptedText_ = "aes_encrypt_value"

const toDecrypt_ = "to_decrypt"
const decryptKey_ = "de_key"
const decryptedText_ = "aes_decrypt_value"

const verifyByteLength = 16 * 2

// encryption method which is called by clicking encrypt button
function encrypt() {
    // retreive plain text from input element
    const plaintext = getElem(toEncrypt_).value
    // retreive key string to generate key
    const keyStr_ = getElem(encryptKey_).value
    // varify if the input plain text is multiple 16 bytes
    if (plaintext.length % verifyByteLength != 0) {
        alert("The plain text should be 16 bytes!")
        return
    }
    // generate encrypted text and assign it to the result input box
    getElem(encryptedText_).value = encryptECBHex(plaintext, keyStr_)
    getElem(encryptedText_).size = encryptECBHex(plaintext, keyStr_).length + 1

}

// decryption method which is called by clicking decrypt button
function decrypt() {
    // retreive cipher text from input element
    const cipher = getElem(toDecrypt_).value
    // retreive key string to generate key
    const keyStr_ = getElem(decryptKey_).value
    // varify if the input plain text is multiple 16 bytes
    if (cipher.length % verifyByteLength != 0) {
        alert("The encrypted text should be n*16 bytes!")
        return
    }
    // generate decrypted text and assign it to the result input box
    getElem(decryptedText_).value = decryptECBHex(cipher, keyStr_)
    getElem(decryptedText_).size = decryptECBHex(cipher, keyStr_).length + 1

}

// encryption method using aes.js library
function encryptECBHex(plaintext, keyStr) {
    const textBytes = aesjs.utils.utf8.toBytes(plaintext)
    const aesECB = getAES_ECB(keyStr)
    const encryptedBytes = aesECB.encrypt(textBytes)
    // return hex form
    return aesjs.utils.hex.fromBytes(encryptedBytes)
}

// generate AES ECB instance from key string for encryption and decryption
function getAES_ECB(keyStr) {
    const aesECB = new aesjs.ModeOfOperation.ecb(getKey(keyStr))
    return aesECB
}

// decryption method using aes.js library
function decryptECBHex(ciphertext, keyStr) {
    const encryptedBytes = aesjs.utils.hex.toBytes(ciphertext)
    const decryptedBytes = getAES_ECB(keyStr).decrypt(encryptedBytes)
    return aesjs.utils.utf8.fromBytes(decryptedBytes)
}

// generates decimal key array for AES ECB instance to use
function getKey(str) {
    // verify if the string length is multiple 16(s)
    if (str.length % verifyByteLength != 0) {
        alert("Must be multiple 16 bytes key!")
        return []
    }
    // put decimal ASCII code to the array
    let arr = []
    for (let c = 0; c < str.length; c++) {
        arr.push(str.charCodeAt(c))
    }
    return arr
}

// called when text to hex ascii input changes
function text1(e) {
    const val = e.target.value
    const hex = ascii_to_hexa(val)
    getElem('hex_to_text').value = hex
    getElem('hex_length').value = `${hex.length / 2} bytes long`
    getElem('text_length').value = `${val.length} bytes long`
    fillTo16()
}

function hex1(e) {
    const val = e.target.value
    const text = hex_to_ascii(val)
    getElem('text_to_hex').value = text
    getElem('text_length').value = `${text.length } bytes long`
    getElem('hex_length').value = `${val.length / 2 } bytes long`
    fillTo16()
}

function fillTo16() {
    const val = getElem('hex_to_text').value
    const filled = fill_to_16(val)
    getElem('fill_16').value = filled
    getElem('fill_16').size = filled.length + 1

    getElem('filled_length').value = `${filled.length / 2} bytes long`
}

function getElem(elemId) {
    return document.getElementById(elemId)
}

function ascii_to_hexa(str) {
    var arr1 = []
    for (var n = 0, l = str.length; n < l; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        if(hex.length<2&&hex=="a"){
            hex="0d0"+hex
        }
        arr1.push(hex);
    }
    return arr1.join('');
}

function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

function fill_to_16(str2) {
    const remain = str2.length % verifyByteLength == 0 ? 0 : verifyByteLength - (str2.length % verifyByteLength)
    let padding = ""

    for (var n = 0; n < remain; n++) {
        padding += "0"
    }
    return padding + str2
}