import useAuth from "@/hooks/use-auth";
import AuthService from "@/lib/services/auth/AuthService";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormFields } from "../types";
import { loginValidationSchema } from "../validations";
import { navigationLinks } from "@/routes";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormFields>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();
  const { update } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      setIsSent(true);
      await AuthService.login(data);
      await update();
      navigate(`${navigationLinks.budget}`);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      setError("root", { message });
    } finally {
      setIsSent(false);
    }
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            disabled={isSent}
            {...field}
            required
            margin="normal"
            id="username"
            label="Username"
            autoComplete="username"
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            disabled={isSent}
            {...field}
            required
            margin="normal"
            id="password"
            label="Password"
            autoComplete="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
          />
        )}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSent}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginPage;
