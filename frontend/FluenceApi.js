import * as fluence from 'fluence';

const privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
const contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
const appId = 257;                                                                      // Deployed database id
const ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL

export default {

    isConnected: false,
    session: null,
    async connect() {
        return await fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
            this.session = s;
        });
    },
    async execute(s) {
        if(!this.isConnected) {
            await this.connect();
        }
        return (await (await this.session.request(s)).result()).asString();//.asString();
    },

    async getTasks() {
        return this.execute(`SELECT * FROM `);
    }
}