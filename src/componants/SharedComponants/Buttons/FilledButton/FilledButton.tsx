const FilledButton = ({
  text,
  aditionalClass,
  type,
  handleClick,
}: {
  text: string;
  aditionalClass?: string;
  type?: string;
  handleClick?: () => void;
}) => {
  let typeStr = "button";
  if (type) {
    typeStr = type;
  }
  return (
    <button
      onClick={handleClick}
      type={typeStr as "button"}
      className={`py-2 font-medium px-5 rounded-md bg-net-red duration-200 hover:bg-net-red/80 text-white ${
        aditionalClass ? aditionalClass : ""
      }`}
    >
      {text}
    </button>
  );
};

export default FilledButton;
