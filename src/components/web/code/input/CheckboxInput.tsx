import '@style/components/web/code/input/checkboxInput.scss';

type CheckboxInputPropsType = {
  checkboxId: string;
  text: string;
  setInputData: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const CheckboxInput = ({
  checkboxId,
  text,
}: CheckboxInputPropsType) => {
  return (
    <>
      <input
        id={checkboxId}
        className="inp-cbx"
        type="checkbox"
      />
      <label className="cbx" htmlFor={checkboxId}>
        <span>
          <svg width="14px" height="11px">
            <use xlinkHref="#check"></use>
          </svg>
        </span>
        <span>{text}</span>
      </label>

      {/* SVG Sprites */}
      <svg className="inline-svg" width="0" height="0">
        <symbol id="check" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </>
  );
};

export default CheckboxInput;
