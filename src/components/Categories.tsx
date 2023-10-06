import { ReactElement, useState } from "react";
import { ReactComponent as Plus } from "../svg/plus-large-svgrepo-com.svg";
import "./Categories.css";
import Category from "./Category";

const Categories = () => {
  const [count, setCount] = useState(1);
  const [elements, setElements] = useState<ReactElement[]>([]);

  const addElement = () => {
    setCount((prev) => prev + 1);
    setElements((prevElements) => [
      ...prevElements,
      <Category onDelete={deleteElement} id={count} />,
    ]);
  };

  const deleteElement = (id: number) => {
    setElements((prevElements) =>
      prevElements.filter((prev) => prev.props.id !== id)
    );
  };

  return (
    <div className="categories-wrapper">
      <div className="box">
        <div className="categories">Categories</div>
        <button onClick={addElement} className="categories-button">
          <Plus width={15} height={15} className="svg-plus" />
        </button>
      </div>

      {elements.length !== 0 && (
        <div className="categories-box">
          {elements.map((element) => (
            <>{element}</>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
