import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import { SearchItem } from './SearchItem';

import { GlobalContext } from '../context/GlobalState';

const CSS = styled.div`
  position: absolute;
  z-index:2;
  width: 24%;

`;

export const SearchResults = () => {
  const [text, setSearch] = useState("");
  const { symbol_list, clearSearch } = useContext(GlobalContext);

  // Hook that alerts clicks outside of the passed ref
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          // Code for user clicking outside search results
          setSearch("");
          clearSearch(text);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  // Declare ref(search results) so outside can be referenced
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    symbol_list.length>0 ?
    <div className="col-4" ref={wrapperRef}>
    <CSS>
      {symbol_list.map(mySymbol => (<SearchItem key={mySymbol.symbol} mySymbol={mySymbol} />))}
    </CSS>
    </div>
    :
    <></>
  )
}
