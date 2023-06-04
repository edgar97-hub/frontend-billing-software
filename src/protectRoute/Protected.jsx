import { Navigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
  var token = localStorage.getItem('token')
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }
  return children;
};
export default Protected;