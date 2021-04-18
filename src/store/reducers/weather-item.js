export const isLoadingWeatherItems = (state = null, action) => {
    switch (action.type) {
        case 'SET_IS_LOADING_WEATHER_ITEMS':
            return action.payload;
        default:
            return state;
    }
};

export const weatherItems = (state = [], action) => {
    switch (action.type) {
        case 'SET_WEATHER_ITEMS':
            return action.payload;
        default:
            return state;
    }
};
