const {decrypt, encrypt} = require("./kms");

(async () => {
    const args = process.argv.slice(2);
    const fn = args[0].trim();
    const data = args[1].trim();
    if (fn === 'encrypt') {
        console.log(await encrypt(data));
    } else if (fn === 'decrypt') {
        console.log(await decrypt(data));
    }
})();
