import React, { useState } from "react";
import { axiosWithAuth } from "./Utils/AxiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, props }) => {
  console.log("COLORS LIST:", colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log("COLOR: ", colorToEdit.id);

    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("COLOR RES:", res);

        axiosWithAuth()
          .get("/api/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then(res => {
        axiosWithAuth()
          .get("/api/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  const addAColor = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/api/colors/`, addColor)
      .then(res => {
        axiosWithAuth()
          .get("/api/colors")
          .then(res => {
            updateColors(res.data);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addAColor}>
        <legend>Add Color</legend>
        <label>
          color name:
          <input
            onChange={e => setAddColor({ ...addColor, color: e.target.value })}
            value={addColor.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setAddColor({
                ...addColor,
                code: { hex: e.target.value }
              })
            }
            value={addColor.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
