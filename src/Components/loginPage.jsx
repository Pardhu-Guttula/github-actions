import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Email, Lock, Domain } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logActivity } from "../utils/logging";

const domains = [
  { value: "brillio", label: "Brillio" },
  { value: "xyz", label: "XYZ Company" },
  { value: "abc", label: "ABC Company" },
];

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    domain: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
    // console.log(formData);
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(formData);
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //refresh the page and send data to backend
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      //     // {
      //     //   headers: {
      //     //     "Content-Type": "application/json",
      //     //   },
      //     // }
      //   );
      //   // const response = await axios.post(
      //   //   "http://localhost:5000/login",
      //   //   formData
      //   // );
      // try {
      //   const response = await axios.post(
      //     "https://be-hpegfmh4aueucjgz.eastus-01.azurewebsites.net/login",
      //     formData
      //   );

      // Log successful login
      await logActivity(formData.email, "User Login", {
        domain: formData.domain,
        outcome: "Success",
      });

      setUserData(response.data);
      navigate("/home", { state: { userData: response.data } });
    } catch (err) {
      // Log failed login attempt
      await logActivity(formData.email, "Failed Login Attempt", {
        domain: formData.domain,
        outcome: "Failed",
        error: err.response?.data?.error || "Unknown error",
      });

      setError(
        err.response?.data?.error ||
          "An error occurred while logging in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Multi-Tenant Login v1.0
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              select
              fullWidth
              required
              name="domain"
              label="Domain"
              value={formData.domain}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Domain sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            >
              {domains.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              required
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: (
                  <Email sx={{ mr: 1, color: "action.active" }} />
                ),
              }}
            />

            <TextField
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                startAdornment: <Lock sx={{ mr: 1, color: "action.active" }} />,
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginForm;
