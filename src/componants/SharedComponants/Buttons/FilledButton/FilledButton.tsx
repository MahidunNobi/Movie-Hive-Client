const FilledButton = ({
  text,
  type,
  handleClick,
}: {
  text: string;
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
      className="py-2 font-medium px-5 rounded-md bg-net-red  hover:bg-net-red/80 text-white"
    >
      {text}
    </button>
  );
};

export default FilledButton;
