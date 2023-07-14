import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { toast } from "react-toastify";

const providerOptions = {
  /* See Provider Options Section */

  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        56: "https://bsc-dataseed1.binance.org/",
        97: "https://data-seed-prebsc-1-s3.binance.org:8545",
        1: "https://mainnet.infura.io/v3/a0c5c687788b471093524af62e5e1cec",
        5: "https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec",
        137: "https://rpc-mainnet.maticvigil.com",
        80001: "https://rpc-mumbai.matic.today"

      },
      // network: "mainnet",
      // chainId: 56,
      // infuraId: "bnb1a5cae5d9hp0we9cx9v02n9hvmt94nnuguv0fav",
    },
  },
};

const web3Modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions, // required
  disableInjectedProvider: false,
});


export const web3 = async () => {
  const provider = await web3Modal.connect();
  const web3 = new Web3(provider);

  return web3;
};

export const Addnetwork = async () => {
  const provider = await web3Modal.connect();
  console.log(provider);
  await provider.request({
    method: 'wallet_addEthereumChain',
    params: [{
      chainId: '0x38',
      chainName: 'Binance Network',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed1.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com']
    }]
  })
    .catch((error) => {
      console.log(error)
    })
}

export const _switch = async () => {
  const provider = await web3Modal.connect();
  const id = toast.loading("Please Check Your Metamask")
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x61" }],
    });
    toast.update(id, { render: "You have successfully switched to Binance Test network", type: "success", isLoading: false, autoClose: 2000 });
    window.location.reload();
    //   toast.success("You have successfully switched to Binance  network")
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x61',
          chainName: 'Binance Test Network',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18
          },
          rpcUrls: ['https://data-seed-prebsc-1-s3.binance.org:8545'],
          blockExplorerUrls: ['https://testnet.bscscan.com']
        }]
      })
        .catch((error) => {
        })
      toast.update(id, { render: "You have successfully Added & switched to Binance Test network", type: "success", isLoading: false, autoClose: 2000 });
      window.location.reload();
    }
    toast.update(id, { render: "Failed to switch to the network", type: "error", isLoading: false, autoClose: 2000 });
  }
};

export const _switchETH = async () => {
  const provider = await web3Modal.connect();
  const id = toast.loading("Please Check Your Metamask")
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x5" }],
    });
    toast.update(id, { render: "You have successfully switched to Etherium Goerli network", type: "success", isLoading: false, autoClose: 2000 });
    window.location.reload();
  } catch (switchError) {
    if (switchError.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x5',
          chainName: 'Goerli Test Network',
          nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18
          },
          rpcUrls: ['https://goerli.infura.io/v3/a0c5c687788b471093524af62e5e1cec'],
          blockExplorerUrls: ['https://goerli.etherscan.io/']
        }]
      })
        .catch((error) => {
        })
      toast.update(id, { render: "You have successfully Added & switched to Goerli Test network", type: "success", isLoading: false, autoClose: 2000 });
      window.location.reload();
    }
    toast.update(id, { render: "Failed to switch to the network", type: "error", isLoading: false, autoClose: 2000 });
  }
};

export const _switchMATIC = async () => {
  const provider = await web3Modal.connect();
  const id = toast.loading("Please Check Your Metamask")
  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x13881" }],
    });
    toast.update(id, { render: "You have successfully switched to Mumbai Polygon Network", type: "success", isLoading: false, autoClose: 2000 });
    window.location.reload();
  } catch (switchError) {
    if (switchError.code === 4902) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x13881',
          chainName: 'Mumbai Polygon Network',
          nativeCurrency: {
            name: 'Matic Coin',
            symbol: 'MATIC',
            decimals: 18
          },
          rpcUrls: ['https://rpc-mumbai.matic.today'],
          blockExplorerUrls: ['https://mumbai.polygonscan.com/']
        }]
      })
        .catch((error) => {
        })
      toast.update(id, { render: "You have successfully Added & switched to Mumbai Polygon Network", type: "success", isLoading: false, autoClose: 2000 });
      window.location.reload();
    }
    toast.update(id, { render: "Failed to switch to the network", type: "error", isLoading: false, autoClose: 2000 });
  }
};

export const Provider = async () => {
  const provider = await web3Modal.connect();

  return provider;
}

export const Disconnect = async () => {
  const disconnect = web3Modal.clearCachedProvider();
  return disconnect;
}
