function aes_hash() {

    // get user input plaintext as hex string
    const plaintext = document.getElementById('plaintext').value;
    // check length of plaintext
    //          p.g. 1 byte = 2 hex digit
    if (plaintext.length % 32 != 0) {
        alert("Your entered plaintext is " + plaintext.length / 2 + " bytes!\n\n" + " The length of plaintext must be a multiple of 16 bytes (32 hex digits)!\n\nPlease re-enter the plaintext!");
        return false;
    }

    // get user entered key
    var key = document.getElementById('key').value;
    // check length of key
    //          p.g. 1 byte = 2 hex digit
    if (key.length % 32 != 0) {
        alert("Your entered key is " + key.length / 2 + " bytes!\n\n" + " The length of key must be a multiple of 16 bytes (32 hex digits)!\n\nPlease re-enter the key!");
        return false;
    }


    // split the plaintext as each 16 bytes (128-bit)
    //      for HEX digit, every 2 characters = 1 byte
    //      thus, in order to get every 16-byte HEX string, 
    //      we should get 32 characters HEX digit (== 16 bytes)
    var array = split_string_by_length(plaintext, 32);
    var m_xor_m = "00000000000000000000000000000000";
    var c = "00000000000000000000000000000000";
    var input_for_aes_encryption = "00000000000000000000000000000000";


    // use for loop to go through each item in the array
    for (i = 0; i < array.length; i++) {

        // compute m_i xor m_i+1
        m_xor_m = hex_xor_hex(m_xor_m, array[i]);

        // compute the plaintext for encryption
        input_for_aes_encryption = hex_xor_hex(c, array[i]);
        // aes encryption
        c = aes_ecb_encryption(input_for_aes_encryption, key);
    }

    // Final steps
    var final_output = hex_xor_hex(m_xor_m, c);
    final_output = aes_ecb_encryption(final_output, key);

    // print the final output on the page
    document.getElementById("hash_value").value = final_output;
}



// 2 inputs:
//       plaintext is a HEX string
//       key is a HEX string
// 1 output:
//       ciphertext is HEX string
function aes_ecb_encryption(plaintext, key) {
    // Convert hex to bytes
    //   using aesjs.utils.hex.toBytes (function in the aes library)
    plaintext = aesjs.utils.hex.toBytes(plaintext);
    key = aesjs.utils.hex.toBytes(key);

    // AES_EBC encryption
    //    functions in the aes libraray
    //        can only accept key as Bytes
    var AES_ECB = new aesjs.ModeOfOperation.ecb(key);
    //        can only accept plaintext as bytes
    //        return result is also in bytes
    var encrypted_in_bytes = AES_ECB.encrypt(plaintext);

    // convert encrypted_in_bytes back to hex
    //      using aesjs.utils.hex.fromBytes (function in the aes library)
    var ciphertext = aesjs.utils.hex.fromBytes(encrypted_in_bytes);

    // return a HEX ciphertext
    return ciphertext;
}



// split a string by specified length
// e.g. 
//     input:
//            string = "abcdefghi"
//            length = 3
//
//     output: 
//            ['abc', 'def', 'ghi']
//
function split_string_by_length(string, length) {

    //crate an empty array
    var array = [];

    // get total length of the input string
    var total_length_of_string = string.length;

    // split the string by every "length" characters
    var begin = 0;
    var end = length;
    while (end <= total_length_of_string) {
        // extract the string from begin to end
        var slice = string.slice(begin, end);
        // save the slice into the array
        array.push(slice);
        // update begin and end
        begin = end;
        end = end + length;
    }
    return array;
}


// 2 inputs:
//       hex1: must be hex digits
//       hex2: must be hex digits
// 1 output:
//       hex digist
function hex_xor_hex(hex1, hex2) {

    hex1 = "0x" + hex1;
    hex2 = "0x" + hex2;

    return (BigInt(hex1) ^ BigInt(hex2)).toString(16);
}