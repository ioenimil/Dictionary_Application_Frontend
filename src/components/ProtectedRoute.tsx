import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    
    const validToken = ()=>{
        const token = Cookies.get('token');
        if (!token) return false;
        try {
            const decoded:any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp > currentTime;
        } catch (error) {
            return false;
        }
    }
    return validToken() ? <Outlet/> : <Navigate to="/" />;


}

export default ProtectedRoute
