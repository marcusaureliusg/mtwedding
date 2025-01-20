import { useState, useEffect } from "react";

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
        // Your Cloud Function URL:
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

  if (loading) return <p>Loading preview...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    <a
      href={url}
      target="_blank"
      rel="noopener, noreferrer"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className="preview-card"
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          maxWidth: "1400px",
          margin: "2rem auto",
        }}
      >
        {previewData.images && previewData.images.length > 0 && (
          <img
            src={previewData.images[0]}
            alt="Preview"
            style={{
              maxWidth: "100%",
              borderRadius: "4px",
              marginBottom: "0.5rem",
            }}
          />
        )}
      </div>
    </a>
    </>
  );
};

export default LinkPreview;
