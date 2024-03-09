import { useEffect, useState, useRef } from "react";
import "./FlipTimer.css";
import Modal from "./Modal";

const FlipTimer = ({ targetDate, customMinutes, playAudio, stopAudio }) => {
  const prevDigitsRef = useRef({ minutes: [], seconds: [] });
  const [timeLeft, setTimeLeft] = useState({ minutes: "000", seconds: "00" });
  const [isCompleted, setIsCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const countdownEndTime = useRef(new Date());

  // Function to update the countdown end time, potentially blocking reset based on current time left
  const updateCountdownEndTime = () => {
    const currentTime = new Date();
    const targetTime = targetDate
      ? new Date(targetDate)
      : new Date(currentTime.getTime() + customMinutes * 60000);
    const timeDifference = targetTime.getTime() - currentTime.getTime();
    const totalMinutesLeft = Math.floor(timeDifference / (1000 * 60));

    // Block reset if currently between 4 and 108 minutes, otherwise proceed with update
    if (
      !(totalMinutesLeft > 4 && totalMinutesLeft < 108 && customMinutes === 108)
    ) {
      countdownEndTime.current = targetTime;
    } else {
      console.log("Reset blocked due to current time constraints.");
    }
  };

  useEffect(() => {
    setIsCompleted(false); // Reset completion state
    setTimeLeft({ minutes: "000", seconds: "00" }); // Reset time left
    updateCountdownEndTime();
    stopAudio && stopAudio();
  }, [customMinutes, targetDate]);

  // Calculate time left
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference =
        countdownEndTime.current.getTime() - new Date().getTime();
      if (difference <= 0) {
        // Avoid setting isCompleted here to prevent loop
        return { minutes: "000", seconds: "00" };
      }
      return {
        minutes: Math.floor(difference / (1000 * 60))
          .toString()
          .padStart(3, "0"),
        seconds: Math.floor((difference / 1000) % 60)
          .toString()
          .padStart(2, "0"),
      };
    };

    const interval = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Check for completion here and update state accordingly
      if (newTimeLeft.minutes === "000" && newTimeLeft.seconds === "00") {
        console.log("set complete");
        setIsCompleted(true);
        clearInterval(interval); // Make sure to clear this interval to prevent further updates
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Removed isCompleted from dependency array to prevent re-triggering

  useEffect(() => {
    if (isCompleted) {
      setTimeout(() => {
        setModalOpen(true);
      }, 2000);
    }
  }, [isCompleted]); // Depend only on isCompleted

  // Trigger audio play at 4-minute mark
  useEffect(() => {
    const totalSeconds =
      parseInt(timeLeft.minutes) * 60 + parseInt(timeLeft.seconds);
    if (totalSeconds === 240 && !isCompleted) {
      playAudio();
    }
  }, [timeLeft, isCompleted, playAudio]);

  // Close modal and reset audio
  const closeModal = () => {
    setModalOpen(false);
  };

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
            // Render a completion state here, background image
            <div
              className={`flip-card-completed ${type}-digit-${index}-completed`}
            ></div>
          )}
        </div>
      </div>
    ));

  if (modalOpen) {
    setTimeout(() => {
      const iframe = document.getElementById("weHaveToGoBack");
      if (iframe) {
        iframe.src += "&autoplay=1"; // Appends autoplay parameter to existing src
      }
    }, 4000); // timeout to match fade-in animation duration
  }

  return (
    <>
      <div className="flip-timer">
        {renderFlipCards(timeLeft.minutes, "minutes")}
        {renderFlipCards(timeLeft.seconds, "seconds")}
      </div>
      {isCompleted && (
        <Modal
          showModal={modalOpen}
          onClose={closeModal}
          contentClass="modal-content"
          classes="modal-backdrop"
        >
          <iframe
            id="weHaveToGoBack"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0Q14rHLvMco?start=0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
          <h2 className="go-back-modal">
            We have to go back...to Kauai!!! Stay tuned for details!
          </h2>
          <p className="go-back-modal-p">
            ....and great job, we are impressed -if you figured this out on your
            own you have won a prize, given at the wedding.
          </p>
        </Modal>
      )}
    </>
  );
};

export default FlipTimer;
