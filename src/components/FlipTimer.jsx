import { useEffect, useState, useRef } from "react";
import "./FlipTimer.css";

const FlipTimer = ({ targetDate }) => {
  const calculateTimeLeft = (date) => {
    const difference = +new Date(date) - +new Date();
    if (difference <= 0) {
      return null;
    }

    const totalMinutes = Math.floor(difference / (1000 * 60)).toString();
    const totalSeconds = Math.floor((difference / 1000) % 60)
      .toString()
      .padStart(2, "0");

    // Remove leading zeros from minutes and ensure at least three digits are shown
    const trimmedMinutes = totalMinutes.replace(/^0+/, "");
    const displayMinutes = trimmedMinutes.padStart(3, "0");

    return {
      minutes: displayMinutes,
      seconds: totalSeconds,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
  const prevDigitsRef = useRef({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft(targetDate);
      if (!newTimeLeft) {
        clearInterval(timer);
        return;
      }
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  useEffect(() => {
    // Compare each digit and apply animation accordingly
    const minuteDigits = timeLeft?.minutes.split("") || [];
    const secondDigits = timeLeft?.seconds.split("") || [];
    const prevMinuteDigits = prevDigitsRef.current.minutes || [];
    const prevSecondDigits = prevDigitsRef.current.seconds || [];

    minuteDigits.forEach((digit, index) => {
      const element = document.querySelector(`.minutes-digit-${index}`);
      if (element && digit !== prevMinuteDigits[index]) {
        // Trigger flip animation
        element.classList.add("flip-animate");
        setTimeout(() => element.classList.remove("flip-animate"), 900);
      }
    });

    secondDigits.forEach((digit, index) => {
      const element = document.querySelector(`.seconds-digit-${index}`);
      if (element && digit !== prevSecondDigits[index]) {
        // Trigger flip animation
        element.classList.add("flip-animate");
        setTimeout(() => element.classList.remove("flip-animate"), 900);
      }
    });

    // Update previous digits ref for next comparison
    prevDigitsRef.current = {
      minutes: minuteDigits,
      seconds: secondDigits,
    };
  }, [timeLeft]);

  const renderFlipCards = (digits, type) => {
    return digits.split("").map((digit, index) => (
      <div
        key={`${type}-${index}`}
        className={`flip-card ${type} ${type}-digit-${index}`}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">{digit}</div>
          <div className="flip-card-back">{digit}</div>
        </div>
      </div>
    ));
  };

  if (!timeLeft) {
    return <div className="flip-timer">The countdown is over!</div>;
  }

  return (
    <div className="flip-timer">
      <div className="flip-timer-row">
        {renderFlipCards(timeLeft.minutes, "minutes")}
      </div>
      <div className="flip-timer-row">
        {renderFlipCards(timeLeft.seconds, "seconds")}
      </div>
    </div>
  );
};

export default FlipTimer;