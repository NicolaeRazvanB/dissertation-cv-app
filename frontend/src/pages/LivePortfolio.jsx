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
    } catch (error) {
      console.error("Error fetching CV:", error);
      setError("Error fetching CVs. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (portfolio) {
      fetchCVData();
    }
  }, [portfolio]);

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

  if (portfolio && portfolio.themeName === "Modern" && cv) {
    return <ModernTheme cv={cv} />;
  } else if (portfolio && portfolio.themeName === "Classic" && cv) {
    return <ClassicTheme cv={cv} />; // Render ClassicTheme component
  }

  return (
    <div>
      <NavbarComponent />
      <div className="container mt-3">
        <h1>Live Portfolio</h1>
        {portfolio ? (
          <div>
            <h2>{portfolio.siteName}</h2>
            <p>Theme: {portfolio.themeName}</p>
          </div>
        ) : (
          <p>No portfolio found.</p>
        )}
      </div>
    </div>
  );
};

export default LivePortfolio;
