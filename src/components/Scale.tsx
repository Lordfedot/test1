import { MouseEventHandler, useEffect, useState } from "react";
import "./Scale.css";
import { ReactComponent as Plus } from "../svg/plus-large-svgrepo-com.svg";
import { ReactComponent as Minus } from "../svg/minus-svgrepo-com.svg";
import { ReactComponent as Confirm } from "../svg/confirm-svgrepo-com.svg";
const numbers = [
  "150%",
  "125%",
  "100%",
  "90%",
  "80%",
  "70%",
  "60%",
  "50%",
  "40%",
  "30%",
  "25%",
];

type Props = {
  getZoom: (zoom: string) => void;
};

const Scale = ({ getZoom }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState("100%");

  const Increment: MouseEventHandler<HTMLButtonElement> = () => {
    numbers.forEach((number, index) => {
      if (number === zoom && index !== 0) {
        console.log(index);

        setZoom(numbers[index - 1]);
      }
    });
  };
  const Decrement: MouseEventHandler<HTMLButtonElement> = () => {
    numbers.forEach((number, index) => {
      if (number === zoom && index !== numbers.length - 1) {
        setZoom(numbers[index + 1]);
      }
    });
  };

  useEffect(() => {
    getZoom(zoom);
  }, [getZoom, zoom]);
  return (
    <>
      <button onClick={Increment} className="button" type="button">
        <Plus width={20} height={20}/>
      </button>
      <div className="wrapper-scale">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="scale-button"
        >
          {zoom}
        </button>
        {isOpen && (
          <ul className="list">
            {numbers.map((number) => (
              <li
                onClick={(e) => setZoom(e.currentTarget.textContent!)}
                className="item"
                key={number}
              >
                {number}
                {number === zoom && <Confirm fill="green" width={15} height={15}/>}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={Decrement} className="button" type="button">
        <Minus width={20} height={20}/>
      </button>
    </>
  );
};

export default Scale;
