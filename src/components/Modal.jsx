// Modal.jsx
const Modal = ({
  showModal,
  onClose,
  children,
  classes,
  contentClass,
  zIndex,
}) => {
  if (!showModal) return null;

  return (
    <div className={classes} style={{ zIndex }}>
      {" "}
      <div className={contentClass}>
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
