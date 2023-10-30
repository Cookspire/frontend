import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { useRef } from "react";
import "../styles/HorizontalContent.css";

export default function HorizontalContent() {
  const customScroll = useRef();

  const scrollRight = () => {
    customScroll.current.scrollLeft += 300;
  };

  const scrollLeft = () => {
    customScroll.current.scrollLeft -= 300;
  };

  return (
    <div className="content">
      <div className="child-left" onClick={scrollLeft}>
        <ArrowBackIosNewIcon htmlColor="white" />
      </div>

      <div className="scrollmenu" ref={customScroll}>
        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>

        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>

        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>

        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>

        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>

        <div className="recipe-type">
          <div className="recipe-img">
            <img
              alt="coffee"
              src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            ></img>
          </div>

          <div className="recipe-name">Coffee</div>

          <div className="recipe-duration">Total time : 20min</div>
        </div>
      </div>

      <div className="child-right" onClick={scrollRight}>
        <ArrowForwardIosIcon htmlColor="white" />
      </div>
    </div>
  );
}
