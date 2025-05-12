export interface ButtonProps {
  text: string;
  bgColor: string;
  clickHandler: () => void;
}

function Button({ text, bgColor, clickHandler }: ButtonProps) {
  return (
    <button
      onClick={() => {
        clickHandler();
      }}
      style={{ backgroundColor: bgColor }}
      className="border-2 hover:scale-110 cursor-pointer py-2 px-4 transition-transform text-lg"
    >
      {text}
    </button>
  );
}

export default Button;
