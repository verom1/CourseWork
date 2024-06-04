import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { navigationLinks } from "@/routes";
import useAuth from "@/hooks/use-auth";

const AuthenticatedGuard = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate to={navigationLinks.login} state={{ from: location }} replace />
    );
  }

  if (isLoggedIn) {
    return <Outlet />;
  }

  return <>{navigate(-1)}</>;
};

export default AuthenticatedGuard;
