import { useState } from "react";

const FilterSection = ({
  title = "Data",
  children = "Here is childrend oianoisnsan",
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white border border-blue-100 rounded-xl p-4 shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-blue-900 font-semibold"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

export default FilterSection;
