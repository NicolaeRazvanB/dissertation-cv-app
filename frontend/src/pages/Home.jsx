import React, { useContext, useState, useEffect } from "react";
import {
  Spinner,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card,
} from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import SidebarButtons from "../components/SidebarButtons";
import { requestOptions, base_url } from "../requestOptions";
import noPhoto from "../../assets/noPhoto.webp";
const HomePage = () => {
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cvs, setCvs] = useState([]);
  const [deployedCVs, setDeployedCVs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPhotoUrl = async (cv) => {
    if (cv.photoName !== "") {
      try {
        const response = await fetch(`${base_url}api/image/${cv.photoName}`, {
          ...requestOptions,
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch image");
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      } catch (error) {
        console.error("Error fetching image:", error);
        return noPhoto;
      }
    }
    return noPhoto;
  };

  const fetchCVs = async () => {
    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await fetch(`${base_url}api/cv/my-cvs`, requestParams);
      if (response.ok) {
        let data = await response.json();
        const cvsData = await Promise.all(
          data.map(async (cv) => ({
            ...cv,
            photoUrl: await fetchPhotoUrl(cv),
          }))
        );
        setCvs(cvsData);
      } else {
        throw new Error("Failed to fetch CVs");
      }
    } catch (error) {
      console.error("Error fetching CVs:", error);
      setError("Error fetching CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDeployedCVs = async () => {
    setLoading(true);
    try {
      const requestParams = {
        ...requestOptions,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const response = await fetch(
        `${base_url}api/deployedCV/deployed-cvs`,
        requestParams
      );
      if (response.ok) {
        let data = await response.json();
        setDeployedCVs(data);
      } else {
        throw new Error("Failed to fetch Deployed CVs");
      }
    } catch (error) {
      console.error("Error fetching Deployed CVs:", error);
      setError("Error fetching Deployed CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCVs();
    fetchDeployedCVs();
  }, [userInfo.cvs]);

  const handleAddCV = () => navigate("/addCV");
  const handleViewWebsites = () => navigate("/portfolios");
  const handleEditProfile = () => navigate("/editProfile");

  const handleDeleteCV = async (cvId) => {
    try {
      const requestParams = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const response = await fetch(`${base_url}api/cv/${cvId}`, requestParams);
      if (!response.ok) throw new Error("Failed to delete CV");
      await fetchCVs();
    } catch (error) {
      console.error(error);
      setError("Error deleting CV. Please try again.");
    }
  };

  const handleLaunchCV = (cvId) => {
    const deployedCV = deployedCVs.find(
      (deployedCV) => deployedCV.cvId === cvId
    );
    if (deployedCV) {
      setError(
        `This CV is already launched. You can view it at: ${base_url}portfolios/${deployedCV.siteName}`
      );
      return;
    }
    navigate(`/deployCV/${cvId}`);
  };

  return (
    <>
      <NavbarComponent />
      <div style={styles.background}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <Container fluid>
            <Row>
              <Col xs={12} md={3} lg={2} style={styles.sidebar}>
                <SidebarButtons />
              </Col>
              <Col>
                <div className="d-flex justify-content-center">
                  <h2 style={styles.heading}>My CVs</h2>
                </div>{" "}
                {error && <Alert variant="danger">{error}</Alert>}
                <Row
                  xs={1}
                  md={2}
                  lg={3}
                  className="g-4 justify-content-center"
                >
                  {" "}
                  {cvs.map((cv) => (
                    <Col key={cv._id} className="d-flex justify-content-center">
                      <Card
                        onClick={() => navigate(`/cv/${cv._id}`)}
                        style={styles.card}
                      >
                        <Card.Img
                          variant="top"
                          src={cv.photoUrl || noPhoto}
                          style={styles.cardImg}
                        />
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                          <Card.Title className="text-center mb-4">
                            {cv.cvName}
                          </Card.Title>
                          <div style={styles.buttonContainer}>
                            <Button
                              variant="secondary"
                              className="me-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLaunchCV(cv._id);
                              }}
                            >
                              Launch Portfolio
                            </Button>
                            <Button
                              variant="info"
                              className="me-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/editCV/${cv._id}`);
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCV(cv._id);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}{" "}
                </Row>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

const styles = {
  background: {
    backgroundColor: "#e0e7ff", // Light blue background color
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    minHeight: "100vh",
  },
  sidebar: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    maxWidth: "200px", // Adjusted to fit the buttons without strangling them
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "2.5rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
    textAlign: "center", // Centering the heading
  },
  card: {
    color: "#333",
    width: "100%",
    maxWidth: "300px",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderBottom: "2px solid #4A90E2",
  },
  buttonContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
  },
};

export default HomePage;
