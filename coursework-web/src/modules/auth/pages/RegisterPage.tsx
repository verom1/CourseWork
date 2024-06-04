import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthApi from "@/lib/api/auth/AuthApi";
import getErrorMessage from "@/lib/utils/getErrorMessage";
import { RegisterFormFields } from "../types";
import { registerValidationSchema } from "../validations";
import { Box, Button, TextField } from "@mui/material";

const RegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const [isSent, setIsSent] = useState(false);

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      clearErrors("root");
      setIsSent(true);
      await AuthApi.register(data);
      await navigate("/auth/login");
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
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            disabled={isSent}
            {...field}
            required
            margin="normal"
            id="firstName"
            label="First name"
            autoComplete="first-name"
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            fullWidth
            disabled={isSent}
            {...field}
            required
            margin="normal"
            id="lastName"
            label="Last name"
            autoComplete="last-name"
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
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
            type="password" 
            autoComplete="password"
            error={!!errors.password}
            helperText={errors.password?.message}
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
        Register
      </Button>
    </Box>
  );
};

export default RegisterPage;
