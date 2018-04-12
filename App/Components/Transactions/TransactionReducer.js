import ACTION_TYPES from "../../Action/ActionsType";

const INITIAL_STATE = {
  transactionList: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_TRANSACTIONS:
      return { ...state, transactionList: action.payload };

    case ACTION_TYPES.CLEAR_TRANSACTIONS:
      return { ...state, transactionList: "" };

    default:
      return state;
  }
};
