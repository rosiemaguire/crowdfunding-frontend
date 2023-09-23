import { Link } from "react-router-dom";
import "./Slider.css"

function SliderProjectCard(props) {
  const { projectData } = props;
  const projectLink = `/project/${projectData.id}`;

  return (
    <div className="slider-project-card">
      <Link to={projectLink}>
        <img className="slide-image" src={projectData.image} />
        <h3>{projectData.title}</h3>
      </Link>
    </div>
  );
}

export default SliderProjectCard;