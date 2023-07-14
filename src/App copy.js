
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
import UserPrivateRoute from "./PrivateRoute/UserPrivateRoute";
import BuyFromMetamask from "./Dashboard/BuyFromMetamask";
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
import BuyfromOtherChain from "./Dashboard/BuyFromOtherchain";
import { NFTlist } from "./Dashboard/NFTlist";
import { CreateStakes } from "./Dashboard/CreateStakes";
import { Stakes } from "./Dashboard/Stakes";
import { Createwallet } from "./pages/Createwallet";
import { Secretphrase } from "./pages/Secretphrase";
import { Verifyphrase } from "./pages/Verifyphrase";


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
        <Route path="/dashboard_home" element={<UserPrivateRoute><DashboardHome /></UserPrivateRoute>} />
        <Route path="/dashboard_tokens" element={<UserPrivateRoute><DashboardTokens /></UserPrivateRoute>} />
        <Route path="/sendotherchain1" element={<UserPrivateRoute><SendOtherChain1 /></UserPrivateRoute>} />
        <Route path="/sendotherchain2" element={<UserPrivateRoute><SendOtherChain2 /></UserPrivateRoute>} />
        <Route path="/sendotherchain3" element={<UserPrivateRoute><SendOtherChain3 /></UserPrivateRoute>} />
        <Route path="/sendCytest1" element={<UserPrivateRoute><SendCytest1 /></UserPrivateRoute>} />
        <Route path="/sendCytest2" element={<UserPrivateRoute><SendCytest2 /></UserPrivateRoute>} />
        <Route path="/sendCytest3" element={<UserPrivateRoute><SendCytest3 /></UserPrivateRoute>} />
        <Route path="/buyfrom_metamask" element={<UserPrivateRoute><BuyFromMetamask /></UserPrivateRoute>} />
        <Route path="/buyfromotherchain" element={<UserPrivateRoute><BuyfromOtherChain /></UserPrivateRoute>} />
        <Route path="/import_token" element={<UserPrivateRoute><ImportToken /></UserPrivateRoute>} />
        <Route path="/import_NFT" element={<UserPrivateRoute><ImportNFT /></UserPrivateRoute>} />
        <Route path="/NFTlist" element={<UserPrivateRoute><NFTlist/></UserPrivateRoute>} />
        <Route path="/*" element={<Navigate to={"/"} />} />

        {/* <Route path="/create-stake" element={<UserPrivateRoute><CreateStakes/></UserPrivateRoute> } />
        <Route path="/stakes" element={<UserPrivateRoute><Stakes/> </UserPrivateRoute>} /> */}


        {/* wallet page new */}

        <Route path="/create-wallet" element={<Createwallet />} />
        <Route path="/secret-phrase" element={<Secretphrase />} />
        <Route path="/verify-phrase" element={<Verifyphrase />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
