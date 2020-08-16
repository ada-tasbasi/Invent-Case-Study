export const getTitleApiData = (data) => {
  data.forEach((el) => {
    el.Year = el.Year.replace("–", "");
  });
  data.sort((a, b) => b.Year - a.Year);
  return {
    type: "TITLE-DATA",
    payload: data,
  };
};

export const getIdApiData = (data) => {
  return {
    type: "ID-DATA",
    payload: data,
  };
};

export const loading = () => {
  return {
    type: "LOADING",
  };
};

export const searchByTitle = (title) => {
  return {
    type: "TITLE",
    payload: title,
  };
};

export const searchById = (id) => {
  return {
    type: "ID",
    payload: id,
  };
};

export const paginateApiData = (data) => {
  return {
    type: "PAGINATED-DATA",
    payload: data,
  };
};

export const setpageCount = (pages) => {
  let pageCount = [];
  for (let i = 1; i <= Math.ceil(pages / 5); i++) {
    pageCount.push(i);
  }
  return {
    type: "PAGE-COUNT",
    payload: pageCount,
  };
};

export const setStartIndex = (index) => {
  return {
    type: "INDEX",
    payload: index,
  };
};
