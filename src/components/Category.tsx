import { ReactElement, useState } from "react";
import "./Category.css";
import { ReactComponent as Plus } from "../svg/plus-large-svgrepo-com.svg";
import { ReactComponent as Confirm } from "../svg/confirm-svgrepo-com.svg";
import { ReactComponent as Edit } from "../svg/edit-svgrepo-com.svg";
import { ReactComponent as Delete } from "../svg/cross-svgrepo-com.svg";
import Service from "./Service";

type Props = {
  id?: number;
  onDelete: (id: number) => void;
};

const Category = ({ id, onDelete }: Props) => {
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [count, setCount] = useState(1);
  const [value, setValue] = useState("");
  const [element, setElement] = useState<"service" | "category" | "">("");
  const [elements, setElements] = useState<ReactElement[]>([]);

  const onConfirm: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (value === "") {
      return;
    }
    setConfirm(true);
    setEditing(false);
  };

  const handleDeleteClick = () => {
    if (id) {
      onDelete(id);
    }
  };

  const handleAddCategoryClick = () => {
    if (element === "category") {
      addCategory();
      return;
    }
    if (element === "service") {
      addService();
      return;
    }
    setOpen(true);
  };

  const addService = () => {
    setCount((prev) => prev + 1);
    setElement("service");
    setElements((prevElements) => [
      ...prevElements,
      <Service onDelete={deleteChildElement} id={count} />,
    ]);
    setOpen(false);
  };
  const addCategory = () => {
    setCount((prev) => prev + 1);
    setElement("category");
    setElements((prevElements) => [
      ...prevElements,
      <Category onDelete={deleteChildElement} id={count} />,
    ]);
    setOpen(false);
  };
  const handleEditClick = () => {
    setEditing(true);
  };
  const deleteChildElement = (id: number) => {
    setElements((prevElements) =>
      prevElements.filter((prev) => prev.props.id !== id)
    );
    if (elements.length <= 1) {
      setElement("");
    }
  };

  return (
    <ul className="category-wrapper">
      {(!confirm || editing) && (
        <li className="category-wrapper2">
          <div className="category-wrapper3">
            <input
              placeholder="Category name"
              className="category-input"
              autoFocus
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <button
              className="category-button"
              type="button"
              onClick={handleDeleteClick}
              style={{ backgroundColor: "yellow" }}
            >
              <Delete width={20} height={20} />
            </button>
            <button
              style={{ backgroundColor: "green" }}
              className="category-button"
              type="button"
              onClick={onConfirm}
            >
              <Confirm width={20} height={20} />
            </button>
          </div>
        </li>
      )}

      <>
        {!editing && confirm && (
          <li className="category-wrapper2">
            <div className="category-wrapper3">
              <p className="category">{value}</p>
              <button
                className="category-button"
                type="button"
                onClick={handleAddCategoryClick}
              >
                <Plus width={20} height={20} />
              </button>
              <button
                className="category-button"
                type="button"
                onClick={handleEditClick}
              >
                <Edit width={20} height={20} />
              </button>
              <button
                className="category-button"
                type="button"
                onClick={handleDeleteClick}
                style={{ backgroundColor: "red" }}
              >
                <Delete width={20} height={20} />
              </button>
            </div>

            {open && (
              <div className="popup">
                <p className="popup-text">What do you want to create?</p>
                <div className="popup-wrapper ">
                  <button className="popup-button" onClick={addService}>
                    Service
                  </button>
                  <button className="popup-button" onClick={addCategory}>
                    Category
                  </button>
                </div>
              </div>
            )}
            {elements.length !== 0 && (
              <div className="category-box">
                {elements.map((element) => (
                  <>{element}</>
                ))}
              </div>
            )}
          </li>
        )}
      </>
    </ul>
  );
};

export default Category;
