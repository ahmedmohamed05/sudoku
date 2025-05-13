export interface ConfirmationButtonsProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmationButtons({
  onConfirm,
  onCancel,
}: ConfirmationButtonsProps) {
  return (
    <div className="my-5 flex gap-3 items-center justify-center">
      <button
        className="bg-green-600 py-2 px-4 text-white transition-transform hover:-translate-y-0.5 text-2xl cursor-pointer"
        onClick={onConfirm}
      >
        Yes
      </button>
      <button
        className="bg-red-600 py-2 px-4 text-white transition-transform hover:-translate-y-0.5 text-2xl cursor-pointer"
        onClick={onCancel}
      >
        No
      </button>
    </div>
  );
}

export default ConfirmationButtons;
