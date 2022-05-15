import React, { useReducer } from "react";

var initialList = [];
const updatePinsReducer = (state, action) => {
  var newPins = [];
  switch (action.type) {
    case "add":
      for(let i = 0; i < state.length; i++){
        if(state[i].park.park.parkCode == action.park.park.parkCode){
          newPins = [...state];
          return newPins;
        }
        
      }
     
      newPins = [
        ...state,
        {
          
          park: action.park,
          notes: action.notes,
          index: action.index
        },
      ];
      return newPins;

    case "remove":
      newPins = [...state];
      newPins.splice(action.index, 1);
      return newPins;
    
    case "save":
        newPins = [...state];
        newPins.splice(action.index, 1);
        newPins = [
          ...state,
          {
            
            park: action.park,
            notes: action.notes,
            index: action.index
          },
        ];
        return newPins;  
    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const PinsContext = React.createContext();

export const PinsProvider = (props) => {
  const [pinsState, dispatchChangePins] = useReducer(
    updatePinsReducer,
    initialList
  );

  return (
    <PinsContext.Provider
      value={{
        listState: pinsState,
        listDispatch: dispatchChangePins,
      }}
    >
      {props.children}
    </PinsContext.Provider>
  );
};