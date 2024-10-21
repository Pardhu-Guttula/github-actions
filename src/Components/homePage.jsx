import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();
  const userData = location.state?.userData;

  const domainPart = userData.email.split("@")[1]; // Extracts the part after "@"
  const domainName = domainPart.split(".")[0];
  return (
    <div>
      <div className="container mt-5">
        <p>
          <strong>Logged in as:</strong> {userData.email} <br />
          <strong>Domain:</strong> {domainName}
        </p>
      </div>
    </div>
  );
}

export default HomePage;
