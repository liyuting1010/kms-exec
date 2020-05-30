const {KMS} = require("aws-sdk");

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION || 'ap-southeast-1';

const kms = new KMS({
    region,
    accessKeyId,
    secretAccessKey,
});

const encrypt = async (plaintText) => {
    const params = {
        KeyId: "6782a242-6876-4791-931c-4330172b861f",
        Plaintext: Buffer.from(plaintText),
    };
    const encryptedText = await kms.encrypt(params).promise();
    return encryptedText.CiphertextBlob.toString('base64');
};

const decrypt = async (crypterText) => {
    const params = {
        CiphertextBlob: Buffer.from(crypterText, 'base64'),
    };
    const decryptedText = await kms.decrypt(params).promise();
    return decryptedText.Plaintext.toString();
};

module.exports = {encrypt, decrypt};
