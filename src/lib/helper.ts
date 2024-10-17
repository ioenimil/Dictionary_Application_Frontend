import { jwtDecode } from "jwt-decode";
export const validToken = (token: string | undefined) => {
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

  export const getAppTheme = (): string => {
    const theme = localStorage.getItem('theme');
    return theme ? theme : 'light';  
  };