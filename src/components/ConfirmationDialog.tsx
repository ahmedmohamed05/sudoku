export interface ConfirmationDialogProps {
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  show: boolean;
}

function ConfirmationDialog({
  title,
  children,
  onCancel,
  show,
}: ConfirmationDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center flex-col bg-gray-800/70">
      <p className="font-bold text-2xl text-center mb-4 text-gray-100">
        {title}
      </p>
      {children}
      <button
        onClick={() => onCancel}
        className="block  bg-amber-50 py-2 px-4  cursor-pointer hover:-translate-y-0.5 transition-transform text-xl"
      >
        Cancel
      </button>
    </div>
  );
}
export default ConfirmationDialog;
