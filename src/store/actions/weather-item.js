import { getWeatherItems } from '../../services/weather-item';

export const fetchWeatherItems = () => async (dispatch) => {
    dispatch(setIsLoadingWeatherItems(true));

    const weatherItems = await getWeatherItems();
    dispatch(setWeatherItems(weatherItems));

    dispatch(setIsLoadingWeatherItems(false));
};

const setIsLoadingWeatherItems = isLoading => ({
    type: 'SET_IS_LOADING_WEATHER_ITEMS',
    payload: isLoading
});

const setWeatherItems = weatherItems => ({
    type: 'SET_WEATHER_ITEMS',
    payload: weatherItems
});