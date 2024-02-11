// Modal.jsx
const Modal = ({ showModal, onClose, children, isSlim = false }) => {
  if (!showModal) return null;
  const backDropClass = isSlim ? "modal-backdrop-slim" : "modal-backdrop";
  const contentClass = isSlim ? "modal-content-slim" : "modal-content";

  return (
    <div className={backDropClass} onClick={onClose}>
      {" "}
      {/* Added onClick here for backdrop close */}
      <div className={contentClass} onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Stop click propagation */}
        {children}
        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
