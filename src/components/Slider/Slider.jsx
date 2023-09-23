import { useState } from "react";
import SliderProjectCard from "./SliderProjectCard";
import "./Slider.css";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const nextSlide = () => {
    setCurrent(current == length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current == 0 ? length - 1 : current - 1);
  };

  return (
    <div id="styled-slider">
      <FaChevronLeft className="left-arrow" onClick={prevSlide} />
      <FaChevronRight className="right-arrow" onClick={nextSlide} />
      {slides.map((projectData, key) => {
        return (
          <section id="slider" key={key}>
            {key === (current == 0 ? length - 1 : current - 1) && (
              <SliderProjectCard projectData={projectData} id="prev" />
            )}
            {key === current && (
              <SliderProjectCard
                projectData={projectData}
                className="current"
              />
            )}
            {key === (current == length - 1 ? 0 : current + 1) && (
              <SliderProjectCard projectData={projectData} id="next" />
            )}
          </section>
        );
      })}
    </div>
  );
};

export default Slider;
