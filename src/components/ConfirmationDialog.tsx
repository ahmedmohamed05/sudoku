import ConfirmationButtons, {
  type ConfirmationButtonsProps,
} from "./ConfirmationButtons";

export interface ConfirmationDialogProps extends ConfirmationButtonsProps {
  title: string;
  show: boolean;
}

function ConfirmationDialog({
  title,
  show,
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center flex-col bg-gray-800/70">
      <p className="font-bold text-2xl text-center mb-4 text-gray-100">
        {title}
      </p>
      <ConfirmationButtons onConfirm={onConfirm} onCancel={onCancel} />
    </div>
  );
}
export default ConfirmationDialog;
