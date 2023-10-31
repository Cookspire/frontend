import ReactDom from "react-dom";
import CloseModal from "../../hooks/CloseModal";
import "../styles/RecipeDetails.css";

const OVERLAY_STYLE = {
  backgroundColor: "rgb(0 0 0 / 70%)",
  zIndex: 1000,
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: "column",
};

export default function RecipeDetails({ handleClose }) {
  const outsideClick = CloseModal(() => {
    handleClose(false);
  }, true);

  return ReactDom.render(
    <div style={{ OVERLAY_STYLE }}>
      <div className="recipe-detail-container">
        <div className="recipe-dialog" ref={outsideClick}>
          <div className="image"></div>

          <div className="name"></div>

          <div className="actions">
            <nav className="menu">
              <div className="item">Ingredients</div>
              <div className="item">Instructions</div>
            </nav>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("recipe-details-portal")
  );
}
