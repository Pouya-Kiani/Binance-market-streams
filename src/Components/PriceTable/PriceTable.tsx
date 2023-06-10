import { FC } from 'react';
import { Wrapper } from './PriceTable.styled';
import { useAppSelector } from '../../app/hooks';
import { selectAllSymbols } from '../../features/prices';
import { PriceColumn } from '../TableColumn/TableColumn';
import Loading from '../Loading/Loading';

export const PriceTable: FC = () => {
  const symbols = useAppSelector(selectAllSymbols);
  if (symbols && symbols?.length > 0) {
    return (
      <Wrapper>
        {symbols?.slice(0, 10).map((symbol) => (
          <PriceColumn key={symbol} symbol={symbol} />
        ))}
      </Wrapper>
    );
  } else return <Loading message="Connecting to the server" />;
};
