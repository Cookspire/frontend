import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useContext, useEffect, useRef, useState } from "react";
import { UpdateNotificationContext } from "../../context/NotificationContext";
import { NotificationType } from "../../environment/APIService";
import CloseModal from "../../hooks/CloseModal";
import "../styles/RecipeDetails.css";
import Notification from "./Notification";

const OVERLAY_STYLE = {
  backgroundColor: "rgb(0 0 0 / 70%)",
  zIndex: 10000,
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

export default function RecipeDetails({ handleClose, createRecipe }) {
  const setNotificationData = useContext(UpdateNotificationContext);

  const outsideClick = CloseModal(() => {
    handleClose(false);
  }, true);

  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsBlock = useRef();
  const ingredientsBlock = useRef();

  const uploadPostImageRef = useRef();

  const openFileUpload = (event) => {
    event.preventDefault();
    uploadPostImageRef.current.click();
  };

  const [recipe, setRecipe] = useState({
    name: "",
    cook_time_mins: "",
    instructions: "",
    imageName: "",
    imageData: "",
  });

  const [ingredientList, setIngredientList] = useState([]);

  const [ingredient, setIngredient] = useState({
    item: { value: "", err: "" },
    quantity: { value: "", err: "" },
    units: { value: "", err: "" },
  });

  const [isValid, setValid] = useState(true);

  const addToList = (e) => {
    e.preventDefault();
    setIngredientList((x) => [
      ...x,
      {
        item: ingredient.item.value,
        quantity: ingredient.quantity.value,
        units: ingredient.units.value,
      },
    ]);
    setIngredient({
      item: { value: "", err: "" },
      quantity: { value: "", err: "" },
      units: { value: "", err: "" },
    });
  };

  function formErrorHandler(field, value) {
    let response = "";
    switch (field) {
      case "item":
        if (!/^[ A-Za-z0-9]{3,100}$/.test(value)) {
          response = "*Min: 3, Max: 100 AlphaNumeric characters.";
        }
        break;
      case "quantity":
        if (!/^[0-9]{1,4}$/.test(value)) {
          response = "*Numeric characters below 1000";
        }
        break;
      case "units":
        if (!/^[ A-Za-z]{1,100}$/.test(value)) response = "Enter a valid unit";
        break;
      default:
        response = "";
    }

    if (response !== "") {
      document
        .getElementById(field)
        .style.setProperty("--fieldBorder", "2px solid hsl(0, 100%, 50%)");
    } else {
      document
        .getElementById(field)
        .style.setProperty("--fieldBorder", "2px solid hsl(0, 0%, 0%, 0.17)");
    }

    return response;
  }

  const changeValues = (e) => {
    const errResponse = formErrorHandler(e.target.id, e.target.value);
    setIngredient((prev) => ({
      ...prev,
      [e.target.id]: { value: e.target.value, err: errResponse },
    }));

    if (
      ingredient.item.value.length > 0 &&
      ingredient.quantity.value.length > 0 &&
      errResponse === ""
    ) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  // useEffect(() => {
  //   document.getElementById("recipe-steps").style.overflow = "hidden";
  //   document.getElementById("recipe-steps").style.height = "0px";
  //   document.getElementById("recipe-steps").style.height =
  //     document.getElementById("recipe-steps").scrollHeight + "px";
  //   if (document.getElementById("recipe-steps").scrollHeight >= 250) {
  //     document.getElementById("recipe-steps").style.overflowY = "scroll";
  //   }
  // }, [recipe.instructions]);

  const handlePostInput = (e) => {
    setRecipe((prev) => ({ ...prev, instructions: e.target.value }));
  };

  const handleFileUpload = (event) => {
    event.preventDefault();
    if (
      uploadPostImageRef.current.files[0] &&
      uploadPostImageRef.current.files[0] !== null
    ) {
      let file = uploadPostImageRef.current.files[0];
      if (
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg"
      ) {
        if (file.size <= 300000) {
          setFilePreview((prev) => ({
            ...prev,
            show: true,
            imageURL: URL.createObjectURL(uploadPostImageRef.current.files[0]),
          }));
          document.getElementById("image").style.border = "none";
        } else {
          setNotificationData(
            true,
            "Kindly upload image size less than 300KB.",
            NotificationType.INFO
          );
        }
      } else {
        setNotificationData(
          true,
          "Only .jpg and .png files are allowed.",
          NotificationType.INFO
        );
      }
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setFilePreview((prev) => ({
      ...prev,
      show: false,
      imageURL: null,
    }));
    document.getElementById("image").style.border = "1px dashed var(--lightDashed)";
  };

  const [filePreview, setFilePreview] = useState({
    show: false,
    imageURL: null,
  });

  const closeRecipeDialog=(e)=>{
    e.preventDefault();
    handleClose(false);
  }

  return (
    <>
      <Notification />
      <div style={OVERLAY_STYLE}>
        <div className="recipe-detail-container" ref={outsideClick}>
          <div
            className="close-dialog"
            title="close"
            onClick={(e) => closeRecipeDialog(e)}
          >
            <div className="remove-icon">&times;</div>
          </div>
          {!createRecipe && (
            <div className="recipe-dialog">
              <div className="header">Let's Cook!</div>

              <div className="image">
                <img
                  alt="coffee"
                  src="https://images.unsplash.com/photo-1497636577773-f1231844b336?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                ></img>
              </div>

              <div className="name">Coffee</div>

              <div className="duration">Total time: 20min</div>

              <div className="actions">
                <nav className="menu">
                  <div className="actions-header">
                    <div className="header-block">
                      <div
                        className="details-block active-block"
                        ref={ingredientsBlock}
                        onClick={() => {
                          ingredientsBlock.current.className =
                            "details-block active-block";
                          instructionsBlock.current.className = "details-block";
                          setShowInstructions(false);
                        }}
                      >
                        Ingredients
                      </div>

                      <div
                        className="details-block"
                        ref={instructionsBlock}
                        onClick={(e) => {
                          ingredientsBlock.current.className = "details-block";
                          instructionsBlock.current.className =
                            "details-block active-block";
                          setShowInstructions(true);
                        }}
                      >
                        Instructions
                      </div>
                    </div>

                    <div className="menu-control">
                      {!showInstructions && (
                        <div className="menu-body">
                          <div className="menu-table">
                            <table>
                              <tr>
                                <th>Item</th>
                                <th>Quantity</th>
                              </tr>
                              <tr>
                                <td>Milk</td>
                                <td>1 ltr</td>
                              </tr>
                              <tr>
                                <td>Coffee Powder</td>
                                <td>1 spoon</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      )}

                      {showInstructions && (
                        <div className="menu-body">
                          <div className="heading">Cooking Instructions</div>

                          <div className="sub-heading">
                            Follow step by step to cook the recipe perfectly!
                          </div>
                          <div className="steps">
                            <ol>
                              <li>Add milk</li>
                              <li>Add sugar</li>
                              <li>Mix coffee powder</li>
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          )}

          {createRecipe && (
            <div className="recipe-dialog">
              <div className="header">Create Recipe</div>

              <div id="image" className="image">
                <input
                  type="file"
                  ref={uploadPostImageRef}
                  id="post-image"
                  style={{ display: "none" }}
                  accept=".png, .jpg, image/png, image/jg"
                  onChange={(e) => handleFileUpload(e)}
                />

                {filePreview.show && (
                  <>
                    <div className="post-image-container">
                      <img
                        className="post-image"
                        alt="imagePreview"
                        src={filePreview.imageURL}
                      />
                      <div
                        className="remove-pic"
                        title="Remove Image"
                        onClick={(e) => removeImage(e)}
                      >
                        <div className="remove-icon">&times;</div>
                      </div>
                    </div>
                  </>
                )}

                {!filePreview.show && (
                  <>
                    <div className="upload-text">Upload recipe image</div>
                    <div
                      className="photo-attachment"
                      onClick={(e) => openFileUpload(e)}
                      title="Upload Image"
                    >
                      <AddPhotoAlternateIcon
                        htmlColor="grey"
                        fontSize="large"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="name">
                <div className="field-input">
                  <input
                    id="recipeName"
                    type="text"
                    placeholder="Recipe Name"
                    autoComplete="off"
                    maxLength={100}
                  />
                </div>
              </div>

              <div className="duration">
                <div className="field-input">
                  <input
                    id="recipeDuration"
                    type="number"
                    pattern="[0-9]{4}"
                    placeholder="Cooking time"
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="actions">
                <nav className="menu">
                  <div className="actions-header">
                    <div className="header-block">
                      <div
                        className="details-block active-block"
                        ref={ingredientsBlock}
                        onClick={() => {
                          ingredientsBlock.current.className =
                            "details-block active-block";
                          instructionsBlock.current.className = "details-block";
                          setShowInstructions(false);
                        }}
                      >
                        Ingredients
                      </div>

                      <div
                        className="details-block"
                        ref={instructionsBlock}
                        onClick={(e) => {
                          ingredientsBlock.current.className = "details-block";
                          instructionsBlock.current.className =
                            "details-block active-block";
                          setShowInstructions(true);
                        }}
                      >
                        Instructions
                      </div>
                    </div>

                    <div className="menu-control">
                      {!showInstructions && (
                        <div className="menu-body">
                          <div className="menu-form">
                            <form
                              className="ingredient-form"
                              onSubmit={(e) => addToList(e)}
                            >
                              <div className="full-field">
                                <div className="field1">
                                  <div className="field-label">
                                    <label htmlFor="item">Item</label>
                                  </div>

                                  <div className="field-input">
                                    <input
                                      id="item"
                                      type="text"
                                      placeholder="Item name"
                                      autoComplete="off"
                                      maxLength={1000}
                                      value={ingredient.item.value}
                                      onChange={(e) => changeValues(e)}
                                    />
                                  </div>
                                  {ingredient.item.err &&
                                    ingredient.item.err.length > 0 && (
                                      <div className="err-msg">
                                        {ingredient.item.err}
                                      </div>
                                    )}
                                </div>

                                <div className="field2">
                                  <div className="field-label">
                                    <label htmlFor="quantity">Quantity</label>
                                  </div>

                                  <div className="field-input">
                                    <input
                                      id="quantity"
                                      type="text"
                                      placeholder="Qty"
                                      maxLength={1000}
                                      autoComplete="off"
                                      value={ingredient.quantity.value}
                                      onChange={(e) => changeValues(e)}
                                    />
                                  </div>
                                  {ingredient.quantity.err &&
                                    ingredient.quantity.err.length > 0 && (
                                      <div className="err-msg">
                                        {ingredient.quantity.err}
                                      </div>
                                    )}
                                </div>

                                <div className="field3">
                                  <div className="field-label">
                                    <label htmlFor="units">Units</label>
                                  </div>

                                  <div className="field-input">
                                    <input
                                      id="units"
                                      type="text"
                                      placeholder="Unit"
                                      autoComplete="off"
                                      maxLength={1000}
                                      value={ingredient.units.value}
                                      onChange={(e) => changeValues(e)}
                                    />
                                  </div>
                                  {ingredient.units.err &&
                                    ingredient.units.err.length > 0 && (
                                      <div className="err-msg">
                                        {ingredient.units.err}
                                      </div>
                                    )}
                                </div>
                              </div>
                              <div className="action">
                                <div className="field-button">
                                  <button type="submit" disabled={!isValid}>
                                    add
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                          <div className="menu-table">
                            <table>
                              <thead>
                                <tr>
                                  <th>Item</th>
                                  <th>Qty</th>
                                  <th>Unit</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ingredientList.length > 0 &&
                                  ingredientList.map((x, index) => (
                                    <tr key={index}>
                                      <td>{x.item}</td>
                                      <td>{x.quantity}</td>
                                      <td>{x.units}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {showInstructions && (
                        <div className="menu-body">
                          <div className="heading">
                            Add your cooking instructions.
                          </div>

                          <div className="sub-heading">
                            For easier readability after each step end with a
                            dot(.)
                          </div>
                          <div className="steps">
                            <textarea
                              id="recipe-steps"
                              autoComplete="off"
                              onChange={(e) => handlePostInput(e)}
                              value={recipe.instructions}
                              rows={2}
                              maxLength={1000}
                              placeholder="What's Cooking?"
                              autoFocus
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </nav>
              </div>

              <div className="submit-container">
                <button>Save Recipe</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
