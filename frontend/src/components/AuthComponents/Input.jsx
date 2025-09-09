const Input = ({ label, logo, id, type, placeholder, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center border bg-input border-border p-3  rounded-lg gap-3">
        {logo}
        <input
          className={`flex-1  focus-visible:outline-none align-middle `}
          name={type}
          id={id}
          type={type}
          placeholder={placeholder}
          value={value && value}
          onChange={onChange && onChange}
          autoComplete="off"
        />
      </div>
    </>
  );
};

export default Input;
