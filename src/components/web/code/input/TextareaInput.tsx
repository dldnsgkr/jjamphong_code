import { useState } from 'react';
import '@style/components/web/code/input/textareaInput.scss';

type TextareaInputPropsType = {
  placeholder: string;
};

const TextareaInput = ({
  placeholder,
}: TextareaInputPropsType) => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div
      className={`textarea-input ${focus ? 'active' : ''}`}
    >
      <textarea
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </div>
  );
};

export default TextareaInput;
