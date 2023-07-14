import { createSlice } from "@reduxjs/toolkit";
const metaMaskWallet = localStorage.getItem("metaMaskWallet");

// const walletAddress = localStorage.getItem("walletAddress");
const authSlice = createSlice({
  name: "Auth",
  initialState: {
    // walletAddress: "",
    metaMaskWallet: !!metaMaskWallet ? metaMaskWallet : "",
    value: { user: {}, isAuthenticated: false },
    // walletCreated: false,
    // accountVerification: "",
    // routeAccess: false,
    isChangeNetwork: "97",
    isChangeContract: "BNB",
    walletMainAdd :{}
  },
  reducers: {
    changenetwork: (state,action) => {
      console.log();
      return {
        ...state,
        isChangeNetwork : action.payload.isChangeNetwork
      }
    },

    changecontract: (state,action) => {
      console.log();
      return {
        ...state,
        isChangeContract : action.payload.isChangeContract
      }
    },
    // giveRouteAccess: (state) => {
    //   return { ...state, routeAccess: true };
    // },
    // revokeRouteAccess: (state) => {
    //   return { ...state, routeAccess: false };
    // },

    signup_data: (state, action) => {
      return {
        ...state,
        value: {
          newUser : action.payload.newUser,
        },
        // walletCreated: action.payload.walletCreated,
      };
    },

    login: (state, action) => {
      return {
        ...state,
        value: {
          user: action.payload.user,
          isAuthenticated: action.payload.isAuthenticated,
          walletAddress:action.payload.walletCreated,
          walletMainAdd : action.payload.walletMainAdd,

        },
        walletCreated: action.payload.walletCreated,
      };
    },
    logout: (state) => {
      localStorage.clear();
      return {
        ...state,
        walletAddress: "",
        metaMaskWallet: "",
        value: { user: {}, isAuthenticated: false },
        // walletCreated: false,
      };
    },
    setWalletAddress: (state, action) => {
      localStorage.setItem("walletAddress", action.payload);
      return { ...state, walletAddress: action.payload };
    },
    setmetaMaskWallet: (state, action) => {
      localStorage.setItem("metaMaskWallet", action.payload);
      return { ...state, metaMaskWallet: action.payload };
    },
  },
});

export const {
  login,
  logout,
  signup_data,
  setWalletAddress,
  setmetaMaskWallet,
  changenetwork,
  changecontract
 
} = authSlice.actions;
export default authSlice.reducer;
