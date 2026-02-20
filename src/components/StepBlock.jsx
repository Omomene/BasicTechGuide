import Lightbox from "./Lightbox";

function StepBlock({ title, image, alt, children }) {
  return (
    <section className="step-block">
      <h2>{title}</h2>
      <p>{children}</p>
      <Lightbox src={image} alt={alt} />
    </section>
  );
}

export default StepBlock;