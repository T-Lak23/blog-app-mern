import React, { useEffect, useRef, useState } from "react";

const Dropdown = ({ options, selected, setSelected, label }) => {
  const selectInputRef = useRef();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleClick = (e) => {
      if (
        selectInputRef.current &&
        !selectInputRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={selectInputRef} className="relative my-5 max-w-33 flex-1 ">
      <p className="mb-2">{label ? label : null}</p>
      <button
        className="w-full px-3.5 py-2 rounded-lg bg-secondary flex justify-between items-center cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selected || "Select an option"} <span className="ml-1">▼</span>
      </button>
      {open && (
        <ul className="border border-border absolute  translate-y-2 top-full bg-secondary left-0 w-full shadow-md z-10 rounded-lg">
          {options.map((opt) => (
            <li
              className="hover:bg-muted-foreground px-3.5 py-2 cursor-pointer"
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
              key={opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
