function TimelineEvent(props) {
  const { iconSrc, iconAlt, title, time, description } = props;
  return (
    <div className="cd-timeline-block animated fadeInUp">
      <div className="cd-timeline-img">
        <img className="logo" src={iconSrc} alt={iconAlt} />
      </div>
      <div className="cd-timeline-content">
        <h3>{title}</h3>
        <h4 className="cd-date for-small">{time}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default TimelineEvent;
