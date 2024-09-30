import '@style/components/web/code/input/BasicInput.scss';
import { useState } from 'react';

type BasicInputPropsType = {
  placeholder: string;
  // inputData: string;
  setInputData: React.Dispatch<
    React.SetStateAction<string>
  >;
};

const BasicInput = ({
  placeholder,
  setInputData,
}: BasicInputPropsType) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={`basic-input ${focus ? 'active' : ''}`}>
      <input
        placeholder={placeholder}
        onChange={(e) => setInputData(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default BasicInput;
