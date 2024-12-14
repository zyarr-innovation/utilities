const openpgp = require("openpgp")
const generateKeyPair = async () => {
    var {privateKey, publicKey} = await openpgp.generateKey({
        curve: 'ed25519',
        userIDs: [
            {
                name: 'zy-innovator', email: 'zy-innovator@gmail.com',
                comment: 'This key is used for Momin girl MyBody Quiz'
            }
        ],
        passphrase: 'MyBody-Gift Of God. Momin Girls High School',
    });

    console.log(privateKey);
    console.log(publicKey);
}

generateKeyPair()