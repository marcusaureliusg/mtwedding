import { useState, useEffect } from "react";
import "./LinkPreview.css";

const LinkPreview = ({ url }) => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url) {
      setError("No URL provided.");
      setLoading(false);
      return;
    }

    const fetchPreview = async () => {
      setLoading(true);
      setError("");
      try {
        // Cloud Function URL:
        const functionUrl =
          "https://us-central1-mtwedding-5f309.cloudfunctions.net/getLinkPreview";
        const response = await fetch(
          `${functionUrl}?url=${encodeURIComponent(url)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPreviewData(data);
      } catch (err) {
        console.error("Error fetching preview:", err);
        setError("Failed to load preview.");
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [url]);

  if (loading)
    return (
      <div style={{ height: "100%" }}>
        <div className="spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    );
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <a
        className="link-preview"
        href={url}
        target="_blank"
        rel="noopener, noreferrer"
      >
        <div className="preview-card">
          {previewData.images && previewData.images.length > 0 && (
            <img src={previewData.images[0]} alt="Preview" />
          )}
        </div>
      </a>
    </>
  );
};

export default LinkPreview;
