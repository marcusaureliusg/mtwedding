function AccommodationOption({
  title,
  imageSrc,
  imageAlt,
  description,
  contactDetails,
}) {
  return (
    <div className="column">
      <p>
        <strong>{title}</strong>
        <img className="section__image" src={imageSrc} alt={imageAlt} />
      </p>
      <p>{description}</p>
      {contactDetails.map((detail, index) => (
        <p key={index}>{detail}</p>
      ))}
    </div>
  );
}

export default AccommodationOption;
