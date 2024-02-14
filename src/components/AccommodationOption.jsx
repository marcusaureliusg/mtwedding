function AccommodationOption({
  title,
  imageSrc,
  imageAlt,
  description,
  contactDetails,
  contactLink
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
       <ul>
        {contactLink.map((link, index) => (
          <li key={index}>
            {link.type === "email" ? (
              <a href={`mailto:${link.address}`}>{link.address}</a>
            ) : link.type === "web" ? (
              <a href={link.address}>{link.text}</a>
            ) : (
              <span>{link.address}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccommodationOption;
