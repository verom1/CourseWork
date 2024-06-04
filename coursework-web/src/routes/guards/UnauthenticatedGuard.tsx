import { Navigate, Outlet, useLocation } from "react-router-dom";
import { navigationLinks } from "@/routes";
import useAuth from "@/hooks/use-auth";

const UnauthenticatedGuard = () => {
  const { isLoggedIn } = useAuth();

  const location = useLocation();

  if (isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: location.state?.from?.pathname || navigationLinks.budget,
        }}
      />
    );
  }

  return <Outlet />;
};

export default UnauthenticatedGuard;
