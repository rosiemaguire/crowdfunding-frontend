import "./AboutPage.css";
function AboutPage() {
  return (
    <article id="about">
      <h1>What is Advocat?</h1>
      <p>
        Advocat is a crowdfunding website to help people raise money for their
        fur children's medical bills.
      </p>
      <br></br>
      <p>
        Please be aware that, though this is a crowdfunding website, actual
        money transactions are not a supported function.
      </p>
      <p>On this site you can:</p>
      <ul>
        <li>Create an account</li>
        <li>Create a project</li>
        <li>Advocat a project by pledging to make a donation</li>
      </ul>
      <br></br>
      <p>
        This website is still under construction, so be sure to check in as more
        functionality becomes available.
      </p>
      <p>
        Alternately, check out the github repo{" "}
        <a href="https://github.com/rosiemaguire/crowdfunding-frontend">here</a>
        . Be sure to make a suggestion or a contribution as detailed in the
        <a href="https://github.com/rosiemaguire/crowdfunding-frontend#contributing">README</a>.
      </p>
    </article>
  );
}

export default AboutPage;
