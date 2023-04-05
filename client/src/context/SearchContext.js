import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  district: undefined,
  dates: [],
  childPitch: undefined,
 
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        district: state.district,
        dates: state.dates,
        childPitch: state.childPitch,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};