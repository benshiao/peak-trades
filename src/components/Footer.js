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
        PeakTrades is a personal project developed by {" "}
        <a className="" href="https://www.linkedin.com/in/benshiao" rel="noreferrer" target="_blank">Benjamin Shiao</a> 
        {" "}using React, Javascript, D3 graphs, and Alphavantage’s stock API. 
      </p>
    </CSS>
  )
}
