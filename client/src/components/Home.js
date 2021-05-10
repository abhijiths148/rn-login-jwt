import styled from "styled-components";

const Item = styled.div`
  display: flex;
  justify-content: center;
  padding: .5rem;
  background: linear-gradient(to bottom, #6371c7, #5563c1);
  color: 'white';
  font-size: 18px;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 50px 50px;
  grid-gap: 10px;
`;

export { Item, Grid };
