import { Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';

export type AutoCompleteOption = {
  key: string;
  label: string;
  disabled?: boolean;
};

export type AutoCompleteProps = {
  id: string;
  name: string;
  multiple?: boolean;
  options: AutoCompleteOption[];
};

const AutoComplete = (props: AutoCompleteProps) => {
  const [optionOpen, setOptionOpen] = useState<boolean>(true);
  const [dropdownClass, setDropdownClass] = useState<string>('');

  const ref = useRef();

  window.addEventListener('resize', () => {
    console.log(window.innerHeight);
  });

  window.addEventListener('scroll', () => {
    console.log(window.innerHeight);
  });

  useEffect(() => {
    const ref = document.getElementById('AutoCompleteID');
    if (ref) {
      const { top, left } = ref?.getBoundingClientRect();
      setDropdownClass(`top-[${top}px] left-[${left}]`);

      const htmlElement = document.documentElement;
      const bodyElement = document.body;

      const height = Math.max(
        htmlElement.clientHeight,
        htmlElement.scrollHeight,
        htmlElement.offsetHeight,
        bodyElement.scrollHeight,
        bodyElement.offsetHeight
      );

      console.log('entire document height: ' + height + 'px');
      // dropdownClass = ;
    }
  }, []);

  // const getWidth = () => {};

  return (
    <div>
      <Input
        type="text"
        id="AutoCompleteID"
        onFocus={(e) => {
          console.log(e.currentTarget.getBoundingClientRect());
        }}
      />
      <div className={`${dropdownClass}`}>
        <div>Hello1</div>
        <div>Hello2</div>
        <div>Hello3</div>
        <div>Hello4</div>
        <div>Hello5</div>
        <div>Hello6</div>
        <div>Hello7</div>
        <div>Hello8</div>
        <div>Hello9</div>
        <div>Hello10</div>
      </div>
    </div>
  );
};

export default AutoComplete;
