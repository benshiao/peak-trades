import styled from "styled-components";

const CSS = styled.div`

  p{
    color: #898996;
    padding: 2% 2% 2% 0%;
    text-align: center;
  }

  background: #373641;

`;

export const Footer = () => {
  return (
    <CSS>
      <p>
        AlgoTrade is a personal project developed by Han using React and Alphavantage’s stock API. 
      </p>
    </CSS>
  )
}
