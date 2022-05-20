import React, { useReducer } from "react";

var initialList = [];
const updateVisitedReducer = (state, action) => {
  var visitedList = [];
  switch (action.type) {
    case "add":
      for (let i = 0; i < state.length; i++) {
        if (state[i].park.park.parkCode == action.parkid) {
          visitedList = [...state];
          return visitedList;
        }
      }
      visitedList = [
        ...state,
        {
          park: action.park,
          index: action.index,
        },
      ];
      return visitedList;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const VisitedContext = React.createContext();

export const VisitedProvider = (props) => {
  const [visitState, dispatchChangeVisit] = useReducer(
    updateVisitedReducer,
    initialList
  );

  return (
    <VisitedContext.Provider
      value={{
        listState: visitState,
        listDispatch: dispatchChangeVisit,
      }}
    >
      {props.children}
    </VisitedContext.Provider>
  );
};
