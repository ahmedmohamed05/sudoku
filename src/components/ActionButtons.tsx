import Button from "./Button";

type HandlerType = () => void;

export interface ActionButtonsProps {
  resetHandler: HandlerType;
  reGenerateGridHandler: HandlerType;
  checkSolHandler: HandlerType;
  solveHandler: HandlerType;
}

function ActionButtons({
  resetHandler,
  reGenerateGridHandler,
  checkSolHandler,
  solveHandler,
}: ActionButtonsProps) {
  return (
    <div className="buttons">
      <Button text="Reset" bgColor="#dc3545" clickHandler={resetHandler} />
      <Button
        text="Re-generate"
        bgColor="#ffc107 "
        clickHandler={reGenerateGridHandler}
      />
      <Button text="Check" bgColor="#0dcaf0" clickHandler={checkSolHandler} />
      <Button bgColor="#198754" text="Solve" clickHandler={solveHandler} />
    </div>
  );
}

export default ActionButtons;
