import { combineReducers } from 'redux';
import { isLoadingWeatherItems, weatherItems } from './weather-item';

const rootReducer = combineReducers({
    weatherItems,
    isLoadingWeatherItems
});

export default rootReducer;