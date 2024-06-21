const BorderButton = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick?: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      className="btn btn-border border-2 text-net-red border-net-red bg-transparent hover:bg-net-red hover:text-white"
    >
      {text}
    </button>
  );
};

export default BorderButton;
