import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";

function PrivateRoute({ children }) {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const apiVersion = import.meta.env.VITE_APP_API_VERSION;
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios.get(`${apiUrl}/${apiVersion}/user/verify`, {
      withCredentials: true
    })
      .then(res => setAuth(true))
      .catch(err => setAuth(false));
  }, []);

  if (auth === null) return <div>Loading...</div>;
  console.log(auth);

  return auth ? children : <Navigate to="/login" replace />;
}




// function PrivateRoute({ children }) {
//   const token = Cookies.get("token");
//   console.log(">>token", token);
//   const isAuthenticated = !!token;
//   return isAuthenticated ? children : <Navigate to="/login" replace />;
// }

export default PrivateRoute;
