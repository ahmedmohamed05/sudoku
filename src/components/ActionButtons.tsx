import Button from "./Button";

type HandlerType = () => void;

export interface ActionButtonsProps {
  resetHandler: HandlerType;
  reGenerateGridHandler: HandlerType;
  checkSolHandler: HandlerType;
  solveHandler: HandlerType;
  changeLevelHandler: HandlerType;
}

function ActionButtons({
  resetHandler,
  reGenerateGridHandler,
  checkSolHandler,
  solveHandler,
  changeLevelHandler,
}: ActionButtonsProps) {
  return (
    <div className=" flex justify-center items-center gap-2 flex-wrap">
      <Button text="Reset" bgColor="#dc3545" clickHandler={resetHandler} />
      <Button
        text="Re-generate"
        bgColor="#ffc107 "
        clickHandler={reGenerateGridHandler}
      />
      <Button text="Check" bgColor="#0dcaf0" clickHandler={checkSolHandler} />
      <Button bgColor="#198754" text="Solve" clickHandler={solveHandler} />
      <Button
        bgColor="#b78cff"
        text="Change Level"
        clickHandler={changeLevelHandler}
      />
    </div>
  );
}

export default ActionButtons;
