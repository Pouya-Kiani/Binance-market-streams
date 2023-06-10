import { FC, ReactNode } from 'react';
import { Wrapper } from './Loading.styled';

const Loading: FC<{ message?: string; children?: ReactNode }> = ({
  message,
  children,
}) => {
  return (
    <Wrapper>
      <h1 className="title">Loading...</h1>
      <p className="message">{message}</p>
      {children}
    </Wrapper>
  );
};

export default Loading;
