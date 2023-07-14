
import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AOS from "aos";


import Homepage from './pages/Homepage';
import DashboardHome from "./Dashboard/DashboardHome";
import SendOtherChain1 from "./Dashboard/SendOtherChain1";
import SendOtherChain2 from "./Dashboard/SendOtherChain2";
import SendOtherChain3 from "./Dashboard/SendOtherChain3";
import ImportToken from "./Dashboard/ImportToken";
import ContactUs from "./pages/ContactUs";
import ImportNFT from "./Dashboard/ImportNFT";
import SendCytest1 from "./Dashboard/SendCytest1";
import SendCytest2 from "./Dashboard/SendCytest2";
import SendCytest3 from "./Dashboard/SendCytest3";
import DashboardTokens from "./Dashboard/DashboardTokens";
import { NFTlist } from "./Dashboard/NFTlist";
import { Createwallet } from "./pages/Createwallet";
import { Secretphrase } from "./pages/Secretphrase";
import { Verifyphrase } from "./pages/Verifyphrase";
import OtpVerification from "./pages/OtpVerification";
import { Enterpin } from "./pages/Enterpin";
import { Confirmpin } from "./pages/Confirmpin";
import { StoreSeed } from "./Dashboard/StoreSeed";
import { Confirmpin2 } from "./pages/Confirmpin2";

import { EnterPinSeed } from "./pages/EnterPinSeed";
import { ConfirmPinSeed } from "./pages/ConfirmPinSeed";
import { ImportSeed } from "./pages/ImportSeed";
import AccountSetting from "./Dashboard/AccountSetting";
import MyAccounts from "./Dashboard/MyAccounts";
import AccountHistory from "./Dashboard/AccountHistory";
import AccountHistoryDetail from "./Dashboard/AccountHistoryDetail";
import { Confirmpinhistory } from "./pages/Confirmpinhistory";
import { Secretphrasehistory } from "./pages/Secretphrasehistory";
import TransferBetween from "./Dashboard/TransferBetween";

function App() {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Private Routes */}
        <Route path="/dashboard_home" element={<DashboardHome />} />
        <Route path="/setting" element={<AccountSetting />} />
        <Route path="/account-detail" element={<MyAccounts />} />

        <Route path="/confirm_login" element={<Confirmpin2 />} />
        <Route path="/dashboard_tokens" element={<DashboardTokens />} />
        <Route path="/sendotherchain1" element={<SendOtherChain1 />} />
        <Route path="/sendotherchain2" element={<SendOtherChain2 />} />
        <Route path="/sendotherchain3" element={<SendOtherChain3 />} />
        <Route path="/sendCytest1" element={<SendCytest1 />} />
        <Route path="/sendCytest2" element={<SendCytest2 />} />
        <Route path="/sendCytest3" element={<SendCytest3 />} />
        <Route path="/import_token" element={<ImportToken />} />
        <Route path="/import_NFT" element={<ImportNFT />} />
        <Route path="/NFTlist" element={<NFTlist/>} />
        <Route path="/*" element={<Navigate to={"/"} />} />
        <Route path="/savePhrase" element={<StoreSeed />} />

        {/* wallet page new */}

        <Route path="/create-wallet" element={<Createwallet />} />
        <Route path="/secret-phrase" element={<Secretphrase />} />
        <Route path="/verify-phrase" element={<Verifyphrase />} />
        <Route path="/verify-otp" element={<OtpVerification />} />
        <Route path="/enter-pin" element={<Enterpin />} />
        <Route path="/Confirm-pin" element={<Confirmpin />} />

        <Route path="/enter-pin-seed" element={<EnterPinSeed />} />
        <Route path="/confirm-pin-seed" element={<ConfirmPinSeed />} />
        <Route path="/enter-seed" element={<ImportSeed />} />
        <Route path="/account-history" element={<AccountHistory />} />
        <Route path="/account-history-detail" element={<AccountHistoryDetail />} />
        <Route path="/confirm-history" element={<Confirmpinhistory />} />
        <Route path="/secret-phrase-history" element={<Secretphrasehistory />} />
        <Route path="/transfer-between-accounts" element={<TransferBetween />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
