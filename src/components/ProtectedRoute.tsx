import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoute = () => {
  const token = Cookies.get("token");
  console.log("Token from Cookies:", token); 
  const validToken = () => {
    if (!token) return false;
    try {
      const decoded: any = jwtDecode(token); 
      const currentTime = Date.now() / 1000;
      console.log("Decoded Token:", decoded);
      return decoded.exp > currentTime; 
    } catch (error) {
      console.error("Error decoding token:", error); 
      return false;
    }
  };
  return validToken() ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
