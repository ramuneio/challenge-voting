export const initialState = {
  isLoading: false,
  error: undefined,
  products: []
};

export const actionTypes = {
  loadAll: "LOAD_ALL",
  loadAllCompleted: "LOAD_ALL_COMPLETED",
  vote: "VOTE",
  voteCompleted: "VOTE_COMPLETED"
};

export const actions = {
  [actionTypes.loadAll]: loadAll,
  [actionTypes.loadAllCompleted]: loadAllCompleted,
  [actionTypes.vote]: vote,
  [actionTypes.voteCompleted]: voteCompleted
};

export default function reducer(state, action) {
  const actionFn = actions[action.type];

  if (actionFn == null) {
    throw new Error(`unknown action type: ${action.type}`);
  }

  return actionFn(state, action);
}

function loadAll() {
  return { ...initialState, isLoading: true };
}

function loadAllCompleted(_, action) {
  return {
    loading: false,
    error: undefined,
    products: action.products.sort(sortByVotesDescending)
  };
}

function vote(state, action) {
  const { products } = state;
  const productIndex = products.findIndex(p => p.id === action.id);

  if (productIndex === -1) {
    return state;
  }

  products[productIndex].isLoading = true;

  return {
    ...state,
    products: [...products].sort(sortByVotesDescending)
  };
}

function voteCompleted(state, action) {
  const { products } = state;
  const productIndex = products.findIndex(p => p.id === action.id);

  if (productIndex === -1) {
    return state;
  }

  products[productIndex].votes = action.votes;
  products[productIndex].isLoading = false;

  return {
    ...state,
    products: [...products].sort(sortByVotesDescending)
  };
}

function sortByVotesDescending(a, b) {
  return b.votes - a.votes;
}
