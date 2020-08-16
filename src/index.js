import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";

const isLoaded = (state = false, action) => {
  switch (action.type) {
    case "LOADING":
      return !state;
    default:
      return state;
  }
};

const apiTitleUrl = (state = "", action) => {
  switch (action.type) {
    case "TITLE":
      return `http://www.omdbapi.com/?apikey=4c929216&s=${action.payload}`;
    default:
      return state;
  }
};
const apiIdUrl = (state = "", action) => {
  switch (action.type) {
    case "ID":
      return `http://www.omdbapi.com/?apikey=4c929216&i=${action.payload}`;
    default:
      return state;
  }
};

const titleApiData = (state = [], action) => {
  switch (action.type) {
    case "TITLE-DATA":
      return action.payload;
    default:
      return state;
  }
};
const idApiData = (state = [], action) => {
  switch (action.type) {
    case "ID-DATA":
      return action.payload;
    default:
      return state;
  }
};

const paginatedData = (state = [], action) => {
  switch (action.type) {
    case "PAGINATED-DATA":
      return action.payload;
    default:
      return state;
  }
};

const pageNum = (state = [], action) => {
  switch (action.type) {
    case "PAGE-COUNT":
      return action.payload;
    default:
      return state;
  }
};
const dataStartIndex = (state = 0, action) => {
  switch (action.type) {
    case "INDEX":
      return action.payload;
    default:
      return state;
  }
};

const allReducers = combineReducers({
  apiTitleUrl,
  apiIdUrl,
  isLoaded,
  titleApiData,
  idApiData,
  paginatedData,
  pageNum,
  dataStartIndex,
});

const store = createStore(allReducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
