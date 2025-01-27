import { Navigate } from "react-router-dom";
import { useAuth } from "./authProvider";
import LoginForm from "../pages/LoginForm";
import SignupForm from "../pages/SignUpForm";

const AuthenticatedRoute = ({ element }) => {
  const { token } = useAuth();

  if (token && (element.type === LoginForm || element.type === SignupForm)) {
    return <Navigate to="/" />;
  }
  if (!token && (element.type === LoginForm || element.type === SignupForm)) {
    return element; // Render login form if no token
  }
  if (token) {
    return element; // If token exists, render the requested component
  } else {
    return <Navigate to="/login" />; // If no token, redirect to login page
  }
};

export default AuthenticatedRoute;
