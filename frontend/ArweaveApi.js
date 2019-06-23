import Arweave from 'arweave/web';

export default {

    async saveItem(s) {
        const arweave = Arweave.init({
            host: 'arweave.net',// Hostname or IP address for a Arweave node
            port: 80,           // Port, defaults to 1984
            protocol: 'https',  // Network protocol http or https, defaults to http
            timeout: 20000,     // Network request timeouts in milliseconds
            logging: false,     // Enable network request logging
        })

        const key = require('../arweave-key.json');
        const transaction = await arweave.createTransaction({
            data: String(s)
        }, key);

        await arweave.transactions.sign(transaction, key);
        const response = await arweave.transactions.post(transaction);

        return 'http://arweave.net/' + transaction.id;
    }
}