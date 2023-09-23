import { Link } from "react-router-dom";
import "./NotFound404Page.css"
function NotFound404Page() {
  return (
    <article id="not-found">
      <img src="https://http.cat/404.jpg" alt="404 Not Found"></img>
      <h2>Lost your way?</h2>
      <p>This is a 404 error, which means you&apos;ve clicked on a bad link or entered an invalid URL.</p>
      <p>Return <Link to="/" id="home">home</Link></p>
    </article>
  )
}

export default NotFound404Page;