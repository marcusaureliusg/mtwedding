function Banner(props) {
  return (
    <div className={props.classes}>
      <img
        sizes="(max-width: 1366px) 100vw, 1366px"
        srcSet={props.srcSet}
        src={props.src}
        alt="Marcus &amp; Taylor - Banner"
        className="bannerimg"
      />
    </div>
  );
}

export default Banner;
