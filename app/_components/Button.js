function Button({ children, params, active, onClick }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        params === active ? "bg-primary-700" : ""
      } `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
