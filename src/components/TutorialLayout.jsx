import { Helmet } from "react-helmet-async";

function TutorialLayout({ title, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title} | BasicTechGuide</title>
        <meta name="description" content={description} />
      </Helmet>

      <article className="tutorial">
        <h1>{title}</h1>
        <p className="tutorial-description">{description}</p>
        {children}
      </article>
    </>
  );
}

export default TutorialLayout;