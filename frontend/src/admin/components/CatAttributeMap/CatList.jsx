const CategoryList = ({ categories, selectedCategory, onSelect }) => {
  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <button
          key={category.cat_id}
          onClick={() => onSelect(category)}
          className={`
w-full
p-5
rounded-2xl
border
text-left
transition

${
  selectedCategory?.cat_id === category.cat_id
    ? "bg-zinc-900 text-white shadow-lg"
    : "bg-white hover:bg-gray-50"
}

`}
        >
          <div className="font-semibold">{category.cat_name}</div>

          <p className="text-sm">{category.cat_description}</p>
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
