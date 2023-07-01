import notFound from "../assets/img/not-found.svg";

const NoMatch = () => {
  return (
    <div className="not-found">
      <img src={notFound} alt="404 not found" />
      <h1>Page does not exist</h1>
      <p>
        Sorry, but it looks like this page doesn’t exist anymore. Why don’t we
        go back and try something else?
      </p>
    </div>
  );
};

export default NoMatch;
