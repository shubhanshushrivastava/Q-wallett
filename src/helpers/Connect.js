import { web3 , Provider, _switch,Disconnect} from "./Web3Helper"; 
import { toast } from "react-toastify";

export const Connect= async()=>{

const web3connect = await web3()

const accounts = await web3connect.eth.getAccounts();

let selectedAccount = accounts[0];
const chainId = await web3connect.eth.getChainId();

if(chainId != 97){
  // toast.warn('Please Switch To BSC Test Network');
  // _switch();
}

const nonce = await web3connect.eth.getTransactionCount(selectedAccount, "latest"); //get latest nonce
// console.log("nonce", nonce);

return {
  selectedAccount: selectedAccount,
  chainId: chainId,
};
}

export const onDisconnect= async()=>{

    const web3connect = await web3()

    const accounts = await web3connect.eth.getAccounts();

    let selectedAccount = accounts[0];

    const provider = await Provider()


    // TODO: Which providers have close method?
    if (provider) {
        // await provider.close();

        // If the cached provider is not cleared,
        // WalletConnect will default to the existing session
        // and does not allow to re-scan the QR code with a new wallet.
        // Depending on your use case you may want or want not his behavir.
        await Disconnect()
        // provider = null;
    }

    selectedAccount = null;
    // Set the UI back to the initial state
    // document.querySelector("#prepare").style.display = "block";
    // document.querySelector("#connected").style.display = "none";
}