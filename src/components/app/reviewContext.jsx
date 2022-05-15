import React, { useReducer } from "react";

var initialList = new Map([]);
const updateReviewReducer = (state, action) => {
  //var reviewsObj = [];
  var reviewsMap = new Map([]);
  //var notesList = [];
  switch (action.type) {
    case "add":
        reviewsMap = state;
        if(reviewsMap.get(action.parkCode) == undefined){
            var newReviews = [{rating: action.rating, notes: action.notes}];
            reviewsMap.set(action.parkCode, newReviews);
        }
        else{
            var oldReviews = reviewsMap.get(action.parkCode);
            var newReviews = [...oldReviews, {rating: action.rating, notes: action.notes}];
            reviewsMap.set(action.parkCode, newReviews);
        }
        console.log(reviewsMap)
        return reviewsMap;

    default:
      throw new Error(`Count Reducer does not recognize ${action.type}`);
  }
};

export const ReviewContext = React.createContext();

export const ReviewProvider = (props) => {
  const [reviewState, dispatchChangeReview] = useReducer(
    updateReviewReducer,
    initialList
  );

  return (
    <ReviewContext.Provider
      value={{
        listState: reviewState,
        listDispatch: dispatchChangeReview,
      }}
    >
      {props.children}
    </ReviewContext.Provider>
  );
};