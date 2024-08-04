import { useEffect, useRef, useState } from 'react';
import '@style/components/web/code/input/DropdownInput.scss';

type DropdownInputPropsType = {
  dropdownValue: string;
  setDropdownValue: React.Dispatch<
    React.SetStateAction<string>
  >;
  dropdownList: {
    [key: string]: {
      text: string;
    };
  };
};

const DropdownInput = ({
  dropdownValue,
  setDropdownValue,
  dropdownList,
}: DropdownInputPropsType) => {
  const [showDropdownList, setShowDropdownList] =
    useState(false);
  const [visibilityAnimation, setVisibilityAnimation] =
    useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /**
   * dropdownList의 transition 관련
   *
   */
  useEffect(() => {
    if (showDropdownList) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setVisibilityAnimation(true);
    } else {
      timeoutIdRef.current = setTimeout(() => {
        setVisibilityAnimation(false);
      }, 400);
    }

    //Clean Up Function
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, [showDropdownList]);

  function focusOutHandler() {
    setShowDropdownList(false);
  }

  return (
    <div className="dropdown-container">
      <div
        className={`dropdown-container__button ${dropdownValue.endsWith('.') ? '' : 'active'}`}
        onClick={() => {
          setShowDropdownList(!showDropdownList);
        }}
        ref={dropdownRef}
        // tabIndex={0}
        onBlur={focusOutHandler}
        role="presentation"
      >
        {dropdownValue}
      </div>
      <div
        className={`list ${showDropdownList ? 'slide-fade-in-dropdown' : 'slide-fade-out-dropdown'} ${visibilityAnimation ? '' : 'vis-hidden'}`}
      >
        {visibilityAnimation && (
          <ul>
            {Object.entries(dropdownList).map(
              ([key, value]) => (
                <li
                  key={key}
                  onClick={() => {
                    setDropdownValue(value.text);
                    setShowDropdownList(!showDropdownList);
                  }}
                  role="presentation"
                >
                  {value.text}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownInput;
