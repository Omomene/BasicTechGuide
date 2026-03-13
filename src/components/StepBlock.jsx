import Lightbox from "./Lightbox";

function StepBlock({ title, image, alt, children }) {
  return (
    <section className="step-block">

      {title && <h2>{title}</h2>}

      <div className="step-content">
        {children}
      </div>

      {image && (
        <Lightbox
          src={image}
          alt={alt || title}
        />
      )}

    </section>
  );
}

export default StepBlock;