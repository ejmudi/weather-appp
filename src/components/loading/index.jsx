import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { pageurl } from '../../utils/constants';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchWeatherItems } from '../../store/actions/weather-item';

export const Loading = ({ isLoadingWeatherItems, fetchWeatherItems }) => {
    const history = useHistory();

    useEffect(() => {
        fetchWeatherItems();
    }, [fetchWeatherItems]);

    useEffect(() => {
        if (isLoadingWeatherItems === false) {
            history.push(pageurl.WEATHERINFO);
        }
    }, [isLoadingWeatherItems, history]);

    return (
        <div className='loading-page'>
            <h2>Loading...</h2>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isLoadingWeatherItems: state.isLoadingWeatherItems
});

const mapDispatchToProps = (dispatch) => (
    bindActionCreators(
        {
            fetchWeatherItems
        },
        dispatch
    )
);

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
