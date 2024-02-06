import { useEffect, useState, useRef } from "react";
import "./FlipTimer.css";

const FlipTimer = ({ targetDate, customMinutes }) => {
  const prevDigitsRef = useRef({ minutes: [], seconds: [] }); // Initialize prevDigitsRef

  const getEndTime = () => {
    if (customMinutes !== undefined) {
      // Calculate future time based on custom minutes
      return new Date(new Date().getTime() + customMinutes * 60000);
    } else if (targetDate) {
      // Parse the targetDate if provided
      return new Date(targetDate);
    }
    // Default to current time if neither is provided
    return new Date();
  };

  const calculateTimeLeft = (endTime) => {
    const difference = +endTime - +new Date();
    if (difference <= 0) {
      return { minutes: '000', seconds: '00' };
    }

    const totalMinutes = Math.floor(difference / (1000 * 60)).toString().padStart(3, '0');
    const totalSeconds = Math.floor((difference / 1000) % 60).toString().padStart(2, '0');

    return {
      minutes: totalMinutes,
      seconds: totalSeconds,
    };
  };

  const endTime = useRef(getEndTime());
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime.current));

  useEffect(() => {
    endTime.current = getEndTime(); // Update the end time if customMinutes changes
    setTimeLeft(calculateTimeLeft(endTime.current)); // Recalculate time left immediately

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime.current));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, customMinutes]);

  useEffect(() => {
    // Apply the flip animation when digits change
    const applyFlipAnimation = (type) => {
      const digits = timeLeft[type].split('');
      digits.forEach((digit, index) => {
        const prevDigit = prevDigitsRef.current[type][index];
        if (digit !== prevDigit) {
          const element = document.querySelector(`.${type}-digit-${index} .flip-card-inner`);
          if (element) {
            element.classList.add('flip-animate');
            setTimeout(() => element.classList.remove('flip-animate'), 900);
          }
        }
      });
      prevDigitsRef.current[type] = digits;
    };

    applyFlipAnimation('minutes');
    applyFlipAnimation('seconds');
  }, [timeLeft]);

  const renderFlipCards = (digits, type) => digits.split("").map((digit, index) => (
    <div key={`${type}-${index}`} className={`flip-card ${type} ${type}-digit-${index}`}>
      <div className="flip-card-inner">
        <div className="flip-card-front">{digit}</div>
        <div className="flip-card-back">{digit}</div>
      </div>
    </div>
  ));

  return (
    <div className="flip-timer">
      <div className="flip-timer-row">{renderFlipCards(timeLeft.minutes, "minutes")}</div>
      <div className="flip-timer-row">{renderFlipCards(timeLeft.seconds, "seconds")}</div>
    </div>
  );
};

export default FlipTimer;
