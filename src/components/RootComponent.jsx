import { useEffect, useRef, useState } from "react";
import FlipTimer from "./FlipTimer";
import CommandInput from "./CommandInput";
import App from "../App";
import timerBeep from "../assets/sounds/timerBeep.mp3";
import fourMin from "../assets/sounds/4m.mp3";
import Modal from "./Modal";
import SmokeMonster from "./SmokeMonster";

const RootComponent = () => {
  const [useCustomMinutes, setUseCustomMinutes] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(null);
  const [modalContentSrc, setModalContentSrc] = useState("");
  const [modalContentClass, setModalContentClass] = useState("");
  const [modalBGClass, setModalBGClass] = useState("");
  const [showModal, setShowModal] = useState(false);
  const timerBeepAudio = useRef(new Audio(timerBeep));
  const fourMinAudio = useRef(null);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showIslandMap, setShowIslandMap] = useState(false);

  const handleEnveloped = () => {
    console.log("Screen is fully enveloped by smoke!");
    setShowIslandMap(true);
  };

  const commonIframeProps = {
    width: "560",
    height: "315",
    frameBorder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    title: "YouTube video player",
  };

  // Initialize fourMinAudio.current on component mount
  useEffect(() => {
    fourMinAudio.current = new Audio(fourMin);
  }, []);

  const playAudio = () => {
    if (fourMinAudio.current && fourMinAudio.current.paused) {
      // eslint-disable-next-line no-self-assign
      fourMinAudio.current.src = fourMinAudio.current.src; // Reset src to force reload
      fourMinAudio.current
        .play()
        .catch((error) => console.error("Audio play failed", error));
    }
  };

  const stopAudio = () => {
    if (fourMinAudio.current && fourMinAudio.current.played.length) {
      fourMinAudio.current.pause();
      fourMinAudio.current.currentTime = 0;
    }
  };

  // Close modal and reset audio
  const closeModal = () => {
    setShowModal(false);
    setModalContentSrc("");
    setModalContentClass("");
    setModalBGClass("");
  };

  const inputHandler = (command) => {
    timerBeepAudio.current.play();
    console.log(command);
    // If the command matches, set customMinutes and useCustomMinutes to trigger the countdown
    if (command.trim() === "4 8 15 16 23 42") {
      timerBeepAudio.current.play();
      setModalContentClass("modal-content-slim");
      setModalBGClass("modal-backdrop-slim");
      setModalContentSrc(
        "https://www.youtube.com/embed/XMR7JjgqsjE?si=Ke6KFr5l4apdi5XC&autoplay=1"
      );
      console.log("Abort Sequence");
      setCustomMinutes(108);
      setUseCustomMinutes(true);
      stopAudio();
      if (!showModal) setShowModal(true);
    }
    if (
      command.replace(/\s+/g, "") === "79460893" ||
      command.replace(/\s+/g, "") === "02079460893"
    ) {
      console.log("I've always loved you");
      setModalContentClass("modal-content-dp");
      setModalBGClass("modal-backdrop-dp");
      setModalContentSrc(
        "https://www.youtube.com/embed/iUaHMOWRYpI?si=ZxW_tbDNGkrM0UI0&autoplay=1"
      );
      if (!showModal) setShowModal(true);
    }
    if (command === "001") {
      timerBeepAudio.current.play();
      console.log("test");
      setCustomMinutes(4.2);
      setUseCustomMinutes(true);
    }
    if (command === "smoke") {
      setShowSmoke(true);
    }
  };

  return (
    <>
      {/* Conditionally render the smoke monster */}
      {showSmoke && (
        <SmokeMonster
          onDefeat={() => console.log("Monster defeated!")}
          onEnveloped={handleEnveloped}
        />
      )}
      <App />
      <Modal
        showModal={showModal}
        onClose={closeModal}
        contentClass={modalContentClass}
        classes={modalBGClass}
      >
        <iframe {...commonIframeProps} src={modalContentSrc}></iframe>
      </Modal>
      <footer className="footer-container">
        <p className="footer-text">Built with ♥ by us</p>
        <div className="footer-widgets">
          <CommandInput onEnter={inputHandler} />
          {useCustomMinutes ? (
            <FlipTimer
              customMinutes={customMinutes}
              playAudio={playAudio}
              stopAudio={stopAudio}
            />
          ) : (
            <FlipTimer targetDate="2025-06-08T16:00:00-07:00" />
          )}
        </div>
      </footer>
    </>
  );
};

export default RootComponent;
