// Store instance actual value
const initialValue = {
  countA: 0,
};

// Reducer
const CountAReducer = (state = initialValue, action) => {
  switch (action.type) {
    case 'IncreaseA':
      return {
        ...state,
        countA: action.data,
      };
    default:
      return state;
  }
};

export default CountAReducer;
