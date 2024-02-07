// Modal.jsx
const Modal = ({ showModal, onClose, children }) => {
  console.log("modal", showModal);
  if (!showModal) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      {" "}
      {/* Added onClick here for backdrop close */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {" "}
        {/* Stop click propagation */}
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
