import { Search } from "lucide-react";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
w-full
border
rounded-2xl
bg-gray-50
pl-10
py-3
outline-none
"
      />
    </div>
  );
};

export default SearchInput;
