import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default AuthenticatedLayout;
