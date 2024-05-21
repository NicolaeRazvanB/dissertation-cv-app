import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestOptions, base_url } from "../requestOptions";
import { AuthContext } from "../context/AuthContext";
import NavbarComponent from "../components/NavbarComponent";
import {
  Spinner,
  Card,
  Button,
  Form,
  FormControl,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

const DeployCV = () => {
  const { userInfo } = useContext(AuthContext);
  const { cvId } = useParams();
  const [cv, setCv] = useState(null);
  const [theme, setTheme] = useState(null);
  const [siteName, setSiteName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeployed, setIsDeployed] = useState(false);
  const [existingDeploymentId, setExistingDeploymentId] = useState(null);
  const navigate = useNavigate();
  const themes = [
    { id: 1, name: "Modern", description: "A sleek and modern design." },
    { id: 2, name: "Classic", description: "A timeless classic style." },
  ];

  const fetchCVData = async () => {
    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await fetch(`${base_url}api/cv/${cvId}`, requestParams);
      if (response.ok) {
        let data = await response.json();
        setCv(data);
      } else {
        throw new Error("Failed to fetch CV");
      }

      const deployedResponse = await fetch(
        `${base_url}api/deployedCV/deployed-cvs`,
        requestParams
      );
      if (deployedResponse.ok) {
        const deployedData = await deployedResponse.json();
        const existingDeployment = deployedData.find((cv) => cv.cvId === cvId);
        if (existingDeployment) {
          setIsDeployed(true);
          setExistingDeploymentId(existingDeployment._id);
          setSiteName(existingDeployment.siteName);
        }
      } else {
        throw new Error("Failed to fetch deployed CVs");
      }
    } catch (error) {
      console.error("Error fetching CV or deployed CVs:", error);
      setError("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVData();
  }, [cvId, userInfo.token]);

  const handleSelectTheme = async (selectedTheme) => {
    setTheme(selectedTheme);

    try {
      // Validate the site name
      if (!siteName) {
        throw new Error("Site name cannot be empty");
      }

      // Generate QR code image with the updated siteName
      const qrUrl = `http://localhost:5173/portfolios/${siteName}`;
      const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);

      // Create a Blob from the Data URL
      const qrCodeBlob = await (await fetch(qrCodeDataUrl)).blob();
      const qrCodeFile = new File([qrCodeBlob], `${cvId}_${siteName}.png`, {
        type: "image/png",
      });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("qrCode", qrCodeFile);
      formData.append("cvId", cvId);
      formData.append("siteName", siteName);

      // Upload QR code image to the server
      const uploadResponse = await fetch(`${base_url}api/uploadQR`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload QR code");
      }

      const { fileName } = await uploadResponse.json();
      const qrCodePath = `/uploads/qrs/${fileName}`;

      // Deploy or update CV with the QR code path
      const deployParams = {
        method: isDeployed ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          userId: userInfo.id,
          cvId: cvId,
          themeName: selectedTheme.name,
          siteName: siteName,
          qrCodePath: qrCodePath,
        }),
      };

      const deployUrl = isDeployed
        ? `${base_url}api/deployedCV/${existingDeploymentId}`
        : `${base_url}api/deployedCV/deployed-cvs`;

      const response = await fetch(deployUrl, deployParams);

      if (!response.ok) {
        throw new Error("Failed to deploy CV");
      }

      navigate("/portfolios/" + siteName);
    } catch (error) {
      console.error("Error deploying CV:", error);
      setError("Failed to deploy. Please try again.");
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="m-4">
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <div>
            <h1 className="text-center">{cv?.cvName || "Your CV"}</h1>
            <Form className="d-flex justify-content-center">
              <FormControl
                type="text"
                placeholder="Enter site name"
                className="mr-2"
                aria-label="Site name"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                style={{ width: "300px" }}
              />
            </Form>
            <div className="d-flex justify-content-around mt-3">
              {themes.map((themeOption) => (
                <Card style={{ width: "18rem" }} key={themeOption.id}>
                  <Card.Body>
                    <Card.Title>{themeOption.name}</Card.Title>
                    <Card.Text>{themeOption.description}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleSelectTheme(themeOption)}
                    >
                      Select This Theme
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeployCV;
