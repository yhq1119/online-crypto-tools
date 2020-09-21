const AWS_KMS_SHA3_256 = "aws_kms_sha3_256_result"

const AWS_KMS_AES_TO_ENCRYPT = "aws_kms_to_encrypt"
const AWS_KMS_AES_ENCRYPT_KEY = "aws_kms_encrypt_key"
const AWS_KMS_AES_ENCRYPTION = "aws_kms_aes_encryption"

const AWS_KMS_AES_TO_DECRYPT = "aws_kms_to_decrypt"
const AWS_KMS_AES_DECRYPT_KEY = "aws_kms_decrypt_key"
const AWS_KMS_AES_DECRYPTION = "aws_kms_aes_decryption"

function toSHA3_256(e) {
    const input = e.target.value
    getElem(AWS_KMS_SHA3_256).value = sha3_256(input)
}

function encrypt_AWS_KMS_AES() {
    const to_encrypt = getElem(AWS_KMS_AES_TO_ENCRYPT).value
    if (to_encrypt.length % 16 != 0) {
        alert("Plain text must be n*16 bytes")
        return
    }
    const encrypt_k = getElem(AWS_KMS_AES_ENCRYPT_KEY).value
    if (encrypt_k.length % 16 != 0) {
        alert("Encrypt key must be n*16 bytes")
        return
    }
    getElem(AWS_KMS_AES_ENCRYPTION).value = encryptECBHex(to_encrypt, encrypt_k)
}

function decrypt_AWS_KMS_AES() {
    const to_decrypt = getElem(AWS_KMS_AES_TO_DECRYPT).value
    if (to_decrypt.length % 16 != 0) {
        alert("Plain text must be n*16 bytes")
        return
    }
    const decrypt_k = getElem(AWS_KMS_AES_DECRYPT_KEY).value
    if (decrypt_k.length % 16 != 0) {
        alert("Decrypt key must be n*16 bytes")
        return
    }
    getElem(AWS_KMS_AES_DECRYPTION).value = decryptECBHex(to_decrypt, decrypt_k)
}