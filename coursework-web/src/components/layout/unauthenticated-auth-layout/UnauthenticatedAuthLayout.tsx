import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const UnauthenticatedAuthLayout = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default UnauthenticatedAuthLayout;
