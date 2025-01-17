import axios from "axios";

export const logActivity = async (email, activity, additionalData = {}) => {
  try {
    await axios.post("http://localhost:5000/log-activity", {
      email,
      activity,
      timestamp: new Date().toISOString(),
      ip_address: await fetchIpAddress(),
      user_agent: navigator.userAgent,
      device_info: getDeviceInfo(),
      session_id: sessionStorage.getItem("sessionId") || "unknown",
      location: "Unknown", // You can integrate with a geolocation service
      outcome: "Success",
      ...additionalData,
    });
  } catch (error) {
    console.error("Error logging activity:", error);
  }
};

const fetchIpAddress = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    return "unknown";
  }
};

const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  return `${platform} - ${userAgent}`;
};
