// Store instance actual value
const initialValue = {
  countB: 0,
};

// Reducer
const CountBReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'IncreaseB':
      return {
        ...state,
        countB: action.data,
      };
    default:
      return state;
  }
};

export default CountBReducer;
