import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useRef, useState } from "react";
import CloseModal from "../../hooks/CloseModal";
import "../styles/RecipeDetails.css";

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
  const outsideClick = CloseModal(() => {
    handleClose(false);
  }, true);

  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsBlock = useRef();
  const ingredientsBlock = useRef();

  const uploadPostImageRef = useRef();

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

        if(file.size<=50000){
          setFilePreview((prev) => ({
            ...prev,
            show: true,
            imageURL: URL.createObjectURL(uploadPostImageRef.current.files[0]),
          }));
        }
        else{
          setNotificationData(
            true,
            "Kindly upload image size less than 50KB.",
            NotificationType.INFO
          );
        }
       
      }
      else{
        setNotificationData(
          true,
          "Only .jpg and .png files are allowed.",
          NotificationType.INFO
        );
      }
    }
  };


  const handleFileUpload = (event) => {
    event.preventDefault();
   
    if (uploadPostImageRef.current.files[0] && uploadPostImageRef.current.files[0] !== null) {
      
      setFilePreview((prev) => ({
        ...prev,
        show: true,
        imageURL: URL.createObjectURL(uploadPostImageRef.current.files[0]),
      }));
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setFilePreview((prev) => ({
      ...prev,
      show: false,
      imageURL: null,
    }));
  };

  const [filePreview, setFilePreview] = useState({
    show: false,
    imageURL: null,
  });

  return (
    <div style={OVERLAY_STYLE}>
      <div className="recipe-detail-container" ref={outsideClick}>
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

            <div className="image">
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
                      title="remove photo"
                      onClick={(e) => removeImage(e)}
                    >
                      <div className="remove-icon">&times;</div>
                    </div>
                  </div>
                </>
              )}

              {!filePreview.show && (
                <div
                  className="photo-attachment"
                  onClick={(e) => openFileUpload(e)}
                  title="Upload Image"
                >
                  <AddPhotoAlternateIcon htmlColor="grey" fontSize="large" />
                </div>
              )}
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
      </div>
    </div>
  );
}
