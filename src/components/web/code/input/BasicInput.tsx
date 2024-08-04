import '@style/components/web/code/input/BasicInput.scss';
import { useState } from 'react';

type BasicInputPropsType = {
  placeholder: string;
};

const BasicInput = ({
  placeholder,
}: BasicInputPropsType) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className={`basic-input ${focus ? 'active' : ''}`}>
      <input
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default BasicInput;
