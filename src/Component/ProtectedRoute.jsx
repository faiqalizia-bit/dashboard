import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  if (!loggedUser) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;