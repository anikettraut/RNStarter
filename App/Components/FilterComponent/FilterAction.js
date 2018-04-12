import ACTION_TYPES from '../../Action/ActionsType';
import API from '../../Constants/APIUrls';


export const clearGetIndoorFeatureListResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_INDOOR_FEATURE_LIST_ACTION
});

export const clearGetOutdoorFeatureListResponse = () => ({
  type: ACTION_TYPES.CLEAR_GET_OUTDOOR_FEATURE_LIST_ACTION
});