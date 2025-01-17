// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import {
//   Container,
//   Paper,
//   Typography,
//   Button,
//   Box,
//   Switch,
//   FormControlLabel,
//   Divider,
//   IconButton,
//   Tooltip,
//   Grid,
//   Card,
//   CardContent,
// } from "@mui/material";
// import {
//   Notifications as NotificationsIcon,
//   DarkMode as DarkModeIcon,
//   Save as SaveIcon,
//   Home as HomeIcon,
//   Person as PersonIcon,
// } from "@mui/icons-material";
// import { logActivity } from "../utils/logging";
// function SettingsPage() {
//   const location = useLocation();
//   const userData = location.state?.userData;
//   const [settings, setSettings] = useState({
//     notification: true,
//     darkMode: false,
//   });
//   const [prevSettings, setPrevSettings] = useState(null);
//   const [userIpAddress, setUserIpAddress] = useState("");

//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await axios.get("/api/user-settings"); // Assuming you're fetching settings from an API
//         setSettings(response.data);
//         setPrevSettings(response.data); // Store the initial state for logging
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//       }
//     };

//     const fetchIpAddress = async () => {
//       try {
//         const response = await axios.get("https://ipinfo.io/json");
//         setUserIpAddress(response.data.ip);
//       } catch (error) {
//         console.error("Error fetching IP address:", error);
//       }
//     };

//     fetchSettings();
//     fetchIpAddress();
//   }, []);

//   //   const logActivity = async (activity) => {
//   //     try {
//   //       await axios.post("http://localhost:5000/log-activity", {
//   //         email: userData.email,
//   //         activity,
//   //         timestamp: new Date().toISOString(),
//   //         ip_address: userIpAddress,
//   //         user_agent: navigator.userAgent,
//   //         device_info: "Windows 10 Chrome Browser",
//   //         session_id: "abcd1234",
//   //         location: "New York, USA",
//   //         outcome: "Success",
//   //         previous_state: prevSettings, // Log previous settings
//   //         updated_state: settings, // Log new settings after update
//   //       });
//   //     } catch (error) {
//   //       console.error("Error logging activity", error);
//   //     }
//   //   };

//   const handleSaveSettings = async () => {
//     try {
//       // Settings save logic
//       await logActivity(userData.email, "Settings Update", {
//         previous_settings: prevSettings,
//         new_settings: settings,
//         outcome: "Success",
//       });
//     } catch (error) {
//       await logActivity(userData.email, "Settings Update Failed", {
//         error: error.message,
//         outcome: "Failed",
//       });
//     }
//   };

//   const handleToggle = async (field) => {
//     const newSettings = {
//       ...settings,
//       [field]: !settings[field],
//     };
//     setSettings(newSettings);

//     await logActivity(userData.email, "Setting Toggle", {
//       setting: field,
//       new_value: !settings[field],
//       outcome: "Success",
//     });
//   };

//   return (
//     <Container maxWidth="md">
//       <Box sx={{ mt: 4, mb: 8 }}>
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
//           <Typography variant="h4" gutterBottom>
//             Settings
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary" mb={4}>
//             Customize your application preferences
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Card>
//                 <CardContent>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <NotificationsIcon color="primary" />
//                       <div>
//                         <Typography variant="h6">Notifications</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Receive alerts and updates
//                         </Typography>
//                       </div>
//                     </Box>
//                     <Switch
//                       checked={settings.notification}
//                       onChange={() => handleToggle("notification")}
//                       color="primary"
//                     />
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12}>
//               <Card>
//                 <CardContent>
//                   <Box
//                     display="flex"
//                     justifyContent="space-between"
//                     alignItems="center"
//                   >
//                     <Box display="flex" alignItems="center" gap={2}>
//                       <DarkModeIcon color="primary" />
//                       <div>
//                         <Typography variant="h6">Dark Mode</Typography>
//                         <Typography variant="body2" color="text.secondary">
//                           Switch between light and dark themes
//                         </Typography>
//                       </div>
//                     </Box>
//                     <Switch
//                       checked={settings.darkMode}
//                       onChange={() => handleToggle("darkMode")}
//                       color="primary"
//                     />
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Box
//             sx={{
//               mt: 4,
//               pt: 2,
//               borderTop: 1,
//               borderColor: "divider",
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Box>
//               <Tooltip title="Go to Home">
//                 <IconButton
//                   component={Link}
//                   to="/home"
//                   state={{ userData }}
//                   color="primary"
//                 >
//                   <HomeIcon />
//                 </IconButton>
//               </Tooltip>
//               <Tooltip title="Go to Profile">
//                 <IconButton
//                   component={Link}
//                   to="/profile"
//                   state={{ userData }}
//                   color="primary"
//                 >
//                   <PersonIcon />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//             <Button
//               variant="contained"
//               startIcon={<SaveIcon />}
//               onClick={handleSaveSettings}
//             >
//               Save Settings
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default SettingsPage;
