import { ReactNode } from 'react';
import './Button.scss';

type Props = {
  onClick: () => void;
  children: ReactNode;
};

function Button({ onClick, children }: Props) {
  return (
    <button onClick={onClick} className='button'>
      {children}
    </button>
  );
}

export default Button;
