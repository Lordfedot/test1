import "./Category.css";
import { ReactComponent as Delete } from "../svg/cross-svgrepo-com.svg";
type Props = {
  id?: number;
  onDelete: (id: number) => void;
};

const Service = ({ id, onDelete }: Props) => {
  const handleDeleteClick = () => {
    if (id) onDelete(id);
  };
  return (
    <div className="category-wrapper">
      <div className="category-wrapper3">
        <p className="category">Service</p>
        <button
          className="category-button"
          type="button"
          onClick={handleDeleteClick}
          style={{ backgroundColor: "red" }}
        >
          <Delete width={20} height={20} />
        </button>
      </div>
    </div>
  );
};
export default Service;
