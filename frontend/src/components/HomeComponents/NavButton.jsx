const NavButton = ({ label, onClick, icon }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="flex items-center sm:text-md bg-primary text-white rounded-xl px-3 py-2.5 text-sm sm:px-4 sm:text-md sm:py-3 gap-1 cursor-pointer"
      >
        {icon}
        {label}
      </button>
    </>
  );
};

export default NavButton;
