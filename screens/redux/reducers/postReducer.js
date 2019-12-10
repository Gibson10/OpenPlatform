const initialState = {
  loading: false,
  loaded: false,
  posts: [],
  error: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {...state, loading: true};
    }
    case 'LOADED': {
      return {...state, loading: false, loaded: true, posts: action.payload};
    }
    case 'ERROR': {
      return {...state, loading: false, error: action.payload};
    }
  }

  return state;
};
