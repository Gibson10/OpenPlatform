const initialState = {
  user: {},
};
export default function(state = initialState, action) {
  switch (action.type) {
    case 'ADD_USER':
      return {user: action.payload};
  }

  return state;
}
