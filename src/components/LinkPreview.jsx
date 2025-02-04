import "./LinkPreview.css";

const LinkPreview = ({ url }) => {
  return (
    <a
      className="link-preview"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="preview-card">
        <img
          src="https://pictime6eus1public-m.azureedge.net/pictures/39/838/39838703/homepage/homepage.jpg?rs=133659875184527190"
          alt="Preview"
        />
      </div>
    </a>
  );
};

export default LinkPreview;
