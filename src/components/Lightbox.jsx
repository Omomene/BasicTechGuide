import { useState } from "react";

function Lightbox({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <img
        src={src}
        alt={alt}
        className="tutorial-image"
        loading="lazy"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="lightbox-overlay" onClick={() => setIsOpen(false)}>
          <img src={src} alt={alt} className="lightbox-image" />
        </div>
      )}
    </>
  );
}

export default Lightbox;