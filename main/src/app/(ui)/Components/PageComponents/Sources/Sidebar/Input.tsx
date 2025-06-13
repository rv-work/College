import React from "react";

interface Props {
  title: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Input: React.FC<Props> = ({ title, options, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-medium text-lg">{title}</p>
      <select
        onChange={onChange}
        className="bg-black text-white rounded p-2 w-full"
      ><option value="">Select One</option>
        {options.map((value, index) => (
          <option key={index} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Input;
