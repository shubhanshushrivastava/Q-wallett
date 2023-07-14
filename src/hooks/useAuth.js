import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth.value);
  return auth;
};

export default useAuth;