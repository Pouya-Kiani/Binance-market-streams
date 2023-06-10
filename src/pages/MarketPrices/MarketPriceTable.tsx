import { FC } from 'react';
import { Wrapper } from './MarketPriceTable.styled';
import { useDailyPricesQuery } from '../../features/prices';
import { PriceTable } from '../../Components/PriceTable/PriceTable';

const MarketPriceTable: FC = () => {
  useDailyPricesQuery();

  return (
    <Wrapper>
      <PriceTable />
    </Wrapper>
  );
};

export default MarketPriceTable;
