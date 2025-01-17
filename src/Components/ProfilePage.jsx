import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Grid,
  TextField,
  IconButton,
  Tooltip,
  Card,
  CardContent,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import { logActivity } from "../utils/logging";

function ProfilePage() {
  const location = useLocation();
  const userData = location.state?.userData;
  const [userIpAddress, setUserIpAddress] = useState("");
  const domainPart = userData.email.split("@")[0]; // Extracts the part after "@"
  const domainName = domainPart.split(".")[0];
  const [message, setMessage] = useState("");
  const [sendStatus, setSendStatus] = useState("");
  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get("https://ipinfo.io/json");
        setUserIpAddress(response.data.ip);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };
    fetchIpAddress();
  }, []);

  //   const logActivity = async (activity) => {
  //     try {
  //       await axios.post("http://localhost:5000/log-activity", {
  //         email: userData.email,
  //         activity,
  //         timestamp: new Date().toISOString(),
  //         ip_address: userIpAddress,
  //         user_agent: navigator.userAgent,
  //         device_info: "Windows 10 Chrome Browser",
  //         session_id: "abcd1234",
  //         location: "New York, USA",
  //         outcome: "Success",
  //       });
  //     } catch (error) {
  //       console.error("Error logging activity", error);
  //     }
  //   };

  const handleProfileUpdate = async () => {
    try {
      // Profile update logic
      await logActivity(userData.email, "Profile Update", {
        updated_fields: ["name", "bio"],
        outcome: "Success",
      });
    } catch (error) {
      await logActivity(userData.email, "Profile Update Failed", {
        error: error.message,
        outcome: "Failed",
      });
    }
  };

  const sendData = async () => {
    try {
      const startTime = new Date();

      const response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "Button clicked" }),
      });

      const data = await response.json();
      setSendStatus(data.status);

      const endTime = new Date();
      const responseTime = endTime - startTime;

      await logActivity(userData.email, "Data Sent", {
        response_time: responseTime,
        outcome: "Success",
      });
    } catch (error) {
      console.error("Error sending data:", error);
      setSendStatus("Error sending data");

      await logActivity(userData.email, "Data Send Failed", {
        error: error.message,
        outcome: "Failed",
      });
    }
  };
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box display="flex" alignItems="center" gap={3} mb={4}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: "primary.main",
                fontSize: "2.5rem",
              }}
            >
              {userData.email[0].toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h4" gutterBottom>
                User Profile
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userData.email}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={domainPart}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                // defaultValue="Doe"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={userData.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                multiline
                rows={4}
                defaultValue="Software Developer"
                variant="outlined"
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 4,
              pt: 2,
              borderTop: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Tooltip title="Go to Home">
                <IconButton
                  component={Link}
                  to="/home"
                  state={{ userData }}
                  color="primary"
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Go to Settings">
                <IconButton
                  component={Link}
                  to="/settings"
                  state={{ userData }}
                  color="primary"
                >
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleProfileUpdate}
            >
              Save Changes
            </Button>
          </Box>
        </Paper>
      </Box>
      <h1>Flask + React App</h1>
      <p>{message}</p>
      <button onClick={sendData}>Send Data to Backend</button>
      {sendStatus && <p>Status: {sendStatus}</p>}
    </Container>
  );
}

export default ProfilePage;
