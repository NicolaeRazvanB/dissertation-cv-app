import React, { useContext, useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { requestOptions, base_url } from "../requestOptions";
import NavbarComponent from "../components/NavbarComponent";
import { AuthContext } from "../context/AuthContext";
import ModernTheme from "./ModernTheme";
import ClassicTheme from "./ClassicTheme"; // Import ClassicTheme component

const LivePortfolio = () => {
  const { siteName } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cv, setCv] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null); // State to store photo URL
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    if (!siteName) {
      setError("Site name is required to fetch the portfolio");
      return;
    }

    const fetchPortfolio = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${base_url}api/deployedCV/deployed-cvs/by-name/${encodeURIComponent(
            siteName
          )}`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        setError("Failed to fetch data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [siteName]);

  const fetchCVData = async () => {
    if (!portfolio) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${base_url}api/cv/${portfolio.cvId}`,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Failed to fetch CV");
      }
      const data = await response.json();
      setCv(data);

      // Fetch the photo URL if photoName is defined
      if (data.photoName) {
        const photoUrl = await fetchPhotoUrl(data.photoName);
        setPhotoUrl(photoUrl);
      }
    } catch (error) {
      console.error("Error fetching CV:", error);
      setError("Error fetching CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch photo URL
  const fetchPhotoUrl = async (photoName) => {
    try {
      const response = await fetch(`${base_url}api/image/${photoName}`, {
        ...requestOptions,
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  useEffect(() => {
    if (portfolio) {
      fetchCVData();
    }
  }, [portfolio, userInfo]); // Add userInfo as dependency

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error: {error}
      </div>
    );
  }

  if (portfolio && cv) {
    if (portfolio.themeName === "Modern") {
      return <ModernTheme cv={cv} photoUrl={photoUrl} />;
    } else if (portfolio.themeName === "Classic") {
      return <ClassicTheme cv={cv} photoUrl={photoUrl} />;
    }
  }

  return null; // Add a return null statement for cases where no condition is met
};

export default LivePortfolio;
