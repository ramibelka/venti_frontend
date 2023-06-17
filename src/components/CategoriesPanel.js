import { Link } from "react-router-dom";

const categories = [
  { name: "Men", id: "Men" },
  { name: "Women", id: "Women" },
  { name: "Sport", id: "Sport" },
  { name: "Accessories", id: "Accessories" },
  { name: "More", id: "More" },
];

function CategoriesPanel() {
  return (
    <div className="categories-panel">
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesPanel;
