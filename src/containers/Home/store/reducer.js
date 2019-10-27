const defaultStore = {
  newsList: [],
  name: "koriw"
};

const reducer = (state = defaultStore, action) => {
  switch (action.type) {
    case "changeList":
      return {
        ...state,
        newsList: action.list
      };
    default:
      return state;
  }
};

export default reducer;
