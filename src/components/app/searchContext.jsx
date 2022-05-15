import React, { useReducer, useEffect } from "react";

var initialList = [];
const updateSearchReducer = (state, action) => {
  var searchList = [];
  switch (action.type) {
    case "create":
      
      searchList = action.list.data.data;
      return searchList;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const SearchContext = React.createContext();

export const SearchProvider = (props) => {
  const [searchState, dispatchChangeSearch] = useReducer(
    updateSearchReducer,
    initialList
  );

  useEffect(() => {
    fetch(
      `https://developer.nps.gov/api/v1/parks?api_key=5mroWmh53h64MgSfZssT1BIbJ0WrKqmV62CsW7yi`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatchChangeSearch({
          type: "create",
          list: {data},
        });
       
      });
  }, []);

  return (
    <SearchContext.Provider
      value={{
        listState: searchState,
        listDispatch: dispatchChangeSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};