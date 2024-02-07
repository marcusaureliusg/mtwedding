import { useEffect, useState, useRef } from "react";
import "./FlipTimer.css";
import Modal from "./Modal";

const FlipTimer = ({ targetDate, customMinutes }) => {
  const prevDigitsRef = useRef({ minutes: [], seconds: [] });
  const [timeLeft, setTimeLeft] = useState({ minutes: "000", seconds: "00" });
  const [isCompleted, setIsCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const countdownEndTime = useRef(new Date());

  // Function to update the countdown end time
  const updateCountdownEndTime = () => {
    countdownEndTime.current =
      customMinutes !== undefined
        ? new Date(new Date().getTime() + customMinutes * 60000)
        : targetDate
        ? new Date(targetDate)
        : new Date();
  };

  // Function to calculate time left
  const calculateTimeLeft = () => {
    if (isCompleted) return timeLeft;

    const difference =
      countdownEndTime.current.getTime() - new Date().getTime();
    if (difference <= 0) {
      setIsCompleted(true);
      setModalOpen(true);
      return { minutes: "000", seconds: "00" };
    }

    const minutes = Math.floor(difference / (1000 * 60))
      .toString()
      .padStart(3, "0");
    const seconds = Math.floor((difference / 1000) % 60)
      .toString()
      .padStart(2, "0");
    return { minutes, seconds };
  };

  // Effect to initialize or update the countdown
  useEffect(() => {
    updateCountdownEndTime(); // Update end time based on current props
    setTimeLeft(calculateTimeLeft()); // Update time left immediately

    const interval = setInterval(() => {
      if (!isCompleted) {
        setTimeLeft(calculateTimeLeft()); // Recalculate time left every second
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [customMinutes, targetDate, isCompleted]);

  useEffect(() => {
    // Trigger animations only if not completed
    if (!isCompleted) {
      ["minutes", "seconds"].forEach((type) => {
        const digits = timeLeft[type].split("");
        digits.forEach((digit, index) => {
          const element = document.querySelector(
            `.${type}-digit-${index} .flip-card-inner`
          );
          const prevDigit = prevDigitsRef.current[type][index];
          if (digit !== prevDigit && element) {
            element.classList.add("flip-animate");
            setTimeout(() => element.classList.remove("flip-animate"), 900);
          }
          prevDigitsRef.current[type][index] = digit;
        });
      });
    }
  }, [timeLeft, isCompleted]);

  const renderFlipCards = (digits, type) =>
    digits.split("").map((digit, index) => (
      <div
        key={`${type}-${index}`}
        className={`flip-card ${type} ${type}-digit-${index} ${
          isCompleted ? "completed" : ""
        }`}
      >
        <div className="flip-card-inner">
          {!isCompleted ? (
            <>
              <div className="flip-card-front">{digit}</div>
              <div className="flip-card-back">{digit}</div>
            </>
          ) : (
            // Optional: Render a completion state here, e.g., a background image
            <div
              className={`flip-card-completed ${type}-digit-${index}-completed`}
            ></div>
          )}
        </div>
      </div>
    ));

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="flip-timer">
        {renderFlipCards(timeLeft.minutes, "minutes")}
        {renderFlipCards(timeLeft.seconds, "seconds")}
      </div>
      {isCompleted && (
        <Modal showModal={modalOpen} onClose={closeModal}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0Q14rHLvMco?start=43&autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h2>We have to go back...to Kauai!!! Stay tuned</h2>
        </Modal>
      )}
    </>
  );
};

export default FlipTimer;
