import fluence from 'fluence';

const privateKey = "569ae4fed4b0485848d3cf9bbe3723f5783aadd0d5f6fd83e18b45ac22496859"; // Authorization private key
const contract = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";                         // Fluence contract address
const appId = 253;                                                                      // Deployed database id
const ethereumUrl = "http://geth.fluence.one:8545";                                    // Ethereum light node URL

let session = null;
fluence.connect(contract, appId, ethereumUrl, privateKey).then((s) => {
    session = s;
});

export default {
    async execute(s) {
        return (await session.request(s)).asString();
    }
}
