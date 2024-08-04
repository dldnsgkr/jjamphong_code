import '@style/components/web/code/button/basicButton.scss';

type BasicButtonPropsType = {
  text: string;
};

const BasicButton = ({ text }: BasicButtonPropsType) => {
  return (
    <button
      className="basic-button button--wayra button--inverted"
      style={{ fontSize: '1.3rem' }}
    >
      {text}
    </button>
  );
};

export default BasicButton;
