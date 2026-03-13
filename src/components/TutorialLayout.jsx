import { Helmet } from "react-helmet-async";

function TutorialLayout({ title, description, children }) {

  return (
    <>
      <Helmet>

        <title>{title} | BasicTechGuide</title>

        <meta
          name="description"
          content={description}
        />

      </Helmet>

      <article className="tutorial">

        <h1>{title}</h1>

        <div className="tutorial-content">
          {children}
        </div>

      </article>
    </>
  );

}

export default TutorialLayout;