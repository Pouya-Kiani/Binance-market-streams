import { FC, useCallback, useEffect, useState } from 'react';

import { selectPriceBySymbol } from '../../features/prices';
import { useAppSelector } from '../../app/hooks';
import { Wrapper } from './TableColumn.styled';
import { EntityId } from '@reduxjs/toolkit';

export const PriceColumn: FC<{ symbol: EntityId }> = ({ symbol }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const data = useAppSelector(selectPriceBySymbol(symbol));

  useEffect(() => {
    if (!data) return;
    setIsUpdating(true);
    const timeout = setTimeout(() => {
      setIsUpdating(false);
    }, 300);
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [data]);

  const changeDirection = useCallback(
    (value?: string): 'up' | 'down' | undefined =>
      value ? (value.includes('-', 0) ? 'down' : 'up') : undefined,
    [],
  );

  return (
    <Wrapper data-animate={isUpdating}>
      <div className="symbol">{data?.symbol}</div>
      <div className="update-status">Perpetual</div>
      <div className="last-price">{data?.lastPrice}</div>
      <div
        className="price-change"
        data-direction={changeDirection(data?.priceChangePercent)}
      >
        {data?.priceChangePercent}
      </div>
    </Wrapper>
  );
};
