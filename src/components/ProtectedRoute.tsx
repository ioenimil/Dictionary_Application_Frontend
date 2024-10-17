import Cookies from "js-cookie";
import { validToken } from "../lib/helper";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
    const token = Cookies.get("token"); 
  return validToken(token) ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
