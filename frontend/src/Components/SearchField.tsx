import { useState, useContext, useEffect } from "react";
import { Search } from "react-bootstrap-icons";
import { SomeContext } from "../SomeContext";
import styled from "styled-components";

function SearchField() {
  const [searchText, setSearchText] = useState(""),
    eventResult = useContext(SomeContext)?.eventResult,
    setFilteredEvents = useContext(SomeContext)?.setFilteredEvents;

  useEffect(() => {
    if (eventResult) {
      let searchFilter = eventResult.filter((event) =>
        event.name.toLowerCase().includes(searchText.toLowerCase())
      );
      console.log(searchFilter);
      setFilteredEvents?.(searchFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, eventResult]);

  return (
    <SearchFieldForm>
      <Search className="SearchField-icon" />
      <SearchFieldInput
        placeholder="Sök"
        onChange={(event) => setSearchText(event.target.value)}
      ></SearchFieldInput>
    </SearchFieldForm>
  );
}

const SearchFieldForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 311px;
  height: 56px;
  margin: auto;

  @media (min-width: 900px) {
    width: 996px;
    height: 59px;
    margin: 0;
    margin-right: 32px;
  }
`;

const SearchFieldInput = styled.input`
  width: 100%;
  height: 80%;
  background: #f1f1f1;
  box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  outline: none;
  border: none;
  padding: 5px 5px 5px 40px;

  @media (min-width: 900px) {
    width: 100%;
    height: 80%;
    background: #f1f1f1;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 37px;
    outline: none;
    border: none;
    padding: 5px 5px 5px 40px;
  }
`;

export default SearchField;
