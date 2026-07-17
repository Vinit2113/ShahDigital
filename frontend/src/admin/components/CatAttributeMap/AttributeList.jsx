import { Check } from "lucide-react";

const AttributeList = ({ attributes, selectedAttributes, toggle }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {attributes.map((attribute) => {
        const checked = selectedAttributes.includes(attribute.attribute_id);

        return (
          <button
            key={attribute.attribute_id}
            onClick={() => toggle(attribute.attribute_id)}
            className={`
              border
              rounded-2xl
              p-5
              flex
              items-center
              gap-3
              transition
              ${
                checked
                  ? "bg-black text-white border-black"
                  : "bg-white hover:bg-gray-50"
              }
            `}
          >
            {checked && <Check size={14} />}

            {attribute.attribute_name}
          </button>
        );
      })}
    </div>
  );
};

export default AttributeList;
