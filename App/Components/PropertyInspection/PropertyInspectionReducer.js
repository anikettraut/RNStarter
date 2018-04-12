import ACTION_TYPES from "../../Action/ActionsType";

const INITIAL_STATE = {
  inspectionList: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPES.GET_INSPECTIONS:
      return { ...state, inspectionList: action.payload };

    case ACTION_TYPES.CLEAR_INSPECTIONS:
      return { ...state, inspectionList: "" };

    default:
      return state;
  }
};
