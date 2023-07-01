import { Link } from "react-router-dom";

const categories = [
  { name: "Men", id: "men" },
  { name: "Women", id: "women" },
  { name: "Kids", id: "kids" },
  { name: "Sports", id: "sports" },
];

function CategoriesPanel() {
  return (
    <div className="categories-panel">
      <ul>
        {/* <Link to="/">
          <li>Home</li>
        </Link> */}
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
