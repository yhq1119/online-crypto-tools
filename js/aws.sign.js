


const AWS_SIGN_INPUT_K = "input_aws_sign_k"
const AWS_SIGN_HEX_K = "aws_sign_k_hex"
const AWS_SIGN_HEX_K_PADDING = "aws_sign_k_hex_padding"
const AWS_SIGN_HEX_K_XOR_IPAD = "aws_sign_k_hex_xor_ipad"
const AWS_SIGN_HEX_K_XOR_OPAD = "aws_sign_k_hex_xor_opad"

const AWS_SIGN_INPUT_M = "input_aws_sign_m"
const AWS_SIGN_HEX_M = "aws_sign_m_hex"

const AWS_SIGN_HEX_K_XOR_APPEND_M = "aws_sign_k_hex_xor_m"
const AWS_SIGN_HEX_M_SHA256 = "aws_sign_k_hex_xor_m_sha256"
const AWS_SIGN_KOPAD_SHA256_KIPAD = "aws_sign_kopad_sha256_kipad"
const AWS_SIGN_HMAC = "hmac"

const AWS_SIGN_SIGNATURE = "hmac_sign"
const DIGITS_HOLD = 128
const IPAD = "36363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636363636"
const OPAD = "5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c5c"

function sign_to_hex_k(e) {
    const val = e.target.value
    const hex = ascii_to_hexa(val)
    getElem(AWS_SIGN_HEX_K).value = hex
    getElem(AWS_SIGN_HEX_K_PADDING).value = paddingHexK(hex)
    getElem(AWS_SIGN_HEX_K_XOR_IPAD).value = XOR_hex(IPAD, hex)
    getElem(AWS_SIGN_HEX_K_XOR_OPAD).value = XOR_hex(OPAD, hex)
    //getElem(AWS_SIGN_KOPAD_SHA256_KIPAD).value = getElem(AWS_SIGN_HEX_K_XOR_OPAD).value + sha245(getElem(AWS_SIGN_HEX_M_SHA256).value)
}

function sign_to_hex_m(e) {
    const val = e.target.value

    const hex = ascii_to_hexa(val)
    getElem(AWS_SIGN_HEX_M).value = hex
    getElem(AWS_SIGN_HEX_K_XOR_APPEND_M).value = getElem(AWS_SIGN_HEX_K_XOR_IPAD).value + hex
    getElem(AWS_SIGN_HEX_M_SHA256).value = sha256(getElem(AWS_SIGN_HEX_K_XOR_APPEND_M).value)
    getElem(AWS_SIGN_KOPAD_SHA256_KIPAD).value = getElem(AWS_SIGN_HEX_K_XOR_OPAD).value + getElem(AWS_SIGN_HEX_M_SHA256).value
    getElem(AWS_SIGN_HMAC).value = sha256(getElem(AWS_SIGN_KOPAD_SHA256_KIPAD).value)
}

// function textTohex_(str){
//     const bytes = aesjs.utils.hex.toBytes(str)
//     const hexStr = aesjs.utils.hex.fromBytes(bytes)
//     return hexStr
// }


function paddingHexK(hex) {
    let padding = ""
    const remain = hex.length % DIGITS_HOLD == 0 ?
        0 : (hex.length < DIGITS_HOLD ?
            DIGITS_HOLD - hex.length : DIGITS_HOLD - (hex.length % DIGITS_HOLD))
    for (let i = 0; i < remain; i++) {
        padding += "0"
    }
    return hex + padding
}

function XOR_hex(a, b) {
    let res = ""
    const i = a.length
    const j = b.length
    let first = a
    let fL = i
    let second = b
    let sL = j

    if (j > i) {
        first = b
        fL = j
        second = a
        sL = i
    }

    for (let n = 0; n < first.length; n++) {
        if (n < second.length) {
            res += (parseInt(first.charAt(n), 16) ^ parseInt(second.charAt(n), 16)).toString(16);
        } else {
            res += parseInt(first.charAt(n), 16).toString(16)
        }

    }

    return res;
}

function hexEncodeSign(e) {
    const val = e.target.value
    const signature = ascii_to_hexa(val)
    // const signature = hexEncode(val)
    getElem(AWS_SIGN_SIGNATURE).size = signature.length + 5
    getElem(AWS_SIGN_SIGNATURE).value = signature
}