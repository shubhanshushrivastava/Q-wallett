import Web3 from "web3";
import PresaleABI from "../ABI/PresaleABI.json"

const address = "0x97025282E0e883fa1EED46276B4DbF57a4cfb978";
const abi = PresaleABI;

export const Details = async () => {

  let web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545"));
  let contract = new web3.eth.Contract(abi,address);
  let rateBUSD = await contract.methods._busdrate().call({
    from :address,
    gas:500000
    })
  rateBUSD = rateBUSD/1e18;
  let rateBNB = await contract.methods.bnbRate().call({
    from :address,
    gas:500000
    })
  rateBNB = rateBNB/1e18;

  let rateEtH = await contract.methods.ethRate().call({
    from :address,
    gas:500000
    })
  rateEtH = rateEtH/1e18;

  let rateBTC = await contract.methods.btcRate().call({
    from :address,
    gas:500000
    })
  rateBTC = rateBTC/1e18;
  let obj = {
    rateBUSD: rateBUSD,
    rateBNB: rateBNB,
    rateEtH: rateEtH,
    rateBTC: rateBTC,
  };

  return obj;
};
