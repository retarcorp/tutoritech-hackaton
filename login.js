// import { doc } from "prettier";

var arweave = Arweave.init({host: 'arweave.net', port: 443, protocol: 'https'});
var wallet = {};
var content = "";

function get_address (files) {
    var fr = new FileReader()
    fr.onload = function (ev) {
        try {
            wallet = JSON.parse(ev.target.result)

            display_address(wallet)

        } catch (err) {
            alert('Error logging in: ' + err)
        }
    }
    fr.readAsText(files[0])
}

function display_address (wallet) {
    (async () => {
        let address = await arweave.wallets.jwkToAddress(wallet)
        let user_address = document.getElementById("user_address")

        user_address.value = address
    })()
}