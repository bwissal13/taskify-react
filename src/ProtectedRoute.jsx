// import { useContext, useEffect } from "react";
// import  AuthContext from "./AuthContext";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({children}) => {
//     const navigate = useNavigate();
//     const { isAuthenticated } = useContext(AuthContext);
//     console.log(isAuthenticated);
//     useEffect(() => {
//         if (!isAuthenticated) {
//             navigate("/");
//         }
//     }, [isAuthenticated, navigate]);
//   return children;
// }

// export default ProtectedRoute
import { useContext, useEffect } from "react";
import AuthContext from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();
    
    useEffect(() => {
        // Redirect to the home page if not authenticated and not already on the home page
        if (!isAuthenticated && location.pathname !== "/") {
            navigate("/");
        } else if (isAuthenticated && location.pathname === "/") {
       console.log('waaaa');
            navigate("/AddTask");
        }
    }, [isAuthenticated, location.pathname, navigate]);
    
    return children;
}

export default ProtectedRoute;