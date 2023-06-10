import { styled } from 'styled-components';

export const Wrapper = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  margin-block-end: 11px;
  padding: 7px 15px;
  line-height: 1.68;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: white;
    opacity: 0;
    transition: all 0.5s;
  }
  &:focus,
  &:hover {
    &::before {
      opacity: 0.2;
    }
  }
  .symbol {
    grid-row: 1;
    grid-column: 1;
    text-align: start;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 700;
  }
  .last-price {
    grid-row: 1/2;
    grid-column: 2/3;
    font-size: 1.3rem;
    text-align: end;
    margin-top: auto;
    /* vertical-align: bottom; */
  }
  .price-change {
    grid-row: 2;
    grid-column: 2;
    font-size: 1.1rem;
    font-weight: 500;
    text-align: end;
    margin-bottom: auto;
    &[data-direction='up'] {
      color: green;
    }

    &[data-direction='down'] {
      color: red;
    }
  }
  @keyframes fade-text {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
  &[data-animate='true'] {
    .last-price {
      /* text-shadow: 0px 0px 5px white; */
      animation: fade-text 0.3s;
    }
    .price-change {
    }
  }
`;
