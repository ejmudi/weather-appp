import React, { useState, useEffect, useCallback } from 'react';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { selectWeatherItems } from '../../selectors';
import { connect } from 'react-redux';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import './index.scss';

export const WeatherInfo = ({ weatherItems }) => {
    const TemperatureTypeEnum = {
        CELSIUS: '1',
        FAHRENHEIT: '2'
    };
    Object.freeze(TemperatureTypeEnum);
    const pageSize = 3;

    const [pageNum, setPageNum] = useState(1);
    const [temperatureType, setTemperatureType] = useState(TemperatureTypeEnum.FAHRENHEIT);
    const [selectedWeatherCardKey, setSelectedWeatherCardKey] = useState();

    const getWeatherItemsByPage = () => weatherItems.slice(pageSize * (pageNum - 1), pageSize * pageNum);

    const memoizedGetWeatherItemsByPage = useCallback(getWeatherItemsByPage, [weatherItems, pageNum]);

    useEffect(() => {
        setSelectedWeatherCardKey(memoizedGetWeatherItemsByPage()[0]?.key);
    }, [memoizedGetWeatherItemsByPage]);

    const getTemperature = temperature => {
        const getCelsiusTemp = fahrenheitTemp => (fahrenheitTemp - 32) * (5 / 9);

        if (temperatureType === TemperatureTypeEnum.CELSIUS) {
            return getCelsiusTemp(temperature);
        }
        return temperature;
    }

    const handleChangePageNum = (direction) => {
        const htmlWidth = document.getElementsByTagName('html')[0].offsetWidth;
        const cardsWrapper = document.getElementById('cards-wrapper');

        if (direction === 'right') {
            setPageNum(pageNum + 1);
            cardsWrapper.scrollLeft += htmlWidth;
        } else {
            setPageNum(pageNum - 1);
            cardsWrapper.scrollLeft -= htmlWidth;
        }
    };

    const handleChangeTemperatureType = (e) => {
        setTemperatureType(e.target.value);
    };

    const renderTemperature = temperature => {
        if (temperatureType === TemperatureTypeEnum.CELSIUS) {
            return <span>{getTemperature(temperature).toFixed(2)}&#176;C</span>;
        }
        return <span>{getTemperature(temperature).toFixed(2)}&#176;F</span>;
    };

    const BlueRadio = withStyles({
        root: {
            color: blue[400],
            '&$checked': {
                color: blue[600],
            },
        },
        checked: {},
    })((props) => <Radio color="default" {...props} />);

    const WeatherCard = ({ date, averageTemp, isSelected, isInView, onClick }) => {
        return (
            <Card
                variant='outlined'
                className={`weather-card${isSelected ? ' selected' : ''}`}
                data-testid={`${isInView ? 'visible-card' : 'hidden-card'}`}
                onClick={onClick}>
                <CardContent>
                    <Typography variant="body1">Temp:</Typography>
                    <Typography variant="body2" color="textSecondary" className='temp-value-text'>{renderTemperature(averageTemp)}</Typography>
                    <Typography variant="body1">Date:</Typography>
                    <Typography variant="body2" color="textSecondary">{date}</Typography>
                </CardContent>
            </Card>
        );
    };

    const selectedWeatherCard = getWeatherItemsByPage().find(x => x.key === selectedWeatherCardKey);
    const weatherCardSegments = selectedWeatherCard?.segments?.map(x => ({
        label: `${getTemperature(x.temperature).toFixed(2)}${temperatureType === TemperatureTypeEnum.FAHRENHEIT ? '°F' : '°C'}`,
        temp: getTemperature(x.temperature),
        segment: x.time
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <div className="title">{payload[0].payload.segment}</div>
                    <div className="subtitle">{`${payload[0].dataKey} : ${label}`}</div>
                </div>
            );
        }

        return null;
    };

    const itemsInView = getWeatherItemsByPage();
    const isDesktop = window.innerWidth >= 1024;

    return (
        <div className='weather-info-page'>
            <h3 className='home-heading'>
                <a href='/weather-appp'>Back To Home (Reload Data)</a>
            </h3>
            <div className='radio-group-wrapper'>
                <RadioGroup
                    row
                    aria-label="temperature"
                    name="temperature"
                    value={temperatureType}
                    onChange={handleChangeTemperatureType}
                >
                    <FormControlLabel
                        value={TemperatureTypeEnum.CELSIUS}
                        control={<BlueRadio />}
                        label="Celsius"
                        className='radio-label' />
                    <FormControlLabel
                        value={TemperatureTypeEnum.FAHRENHEIT}
                        control={<BlueRadio />}
                        label="Fahrenheit"
                        className='radio-label' />
                </RadioGroup>
            </div>
            <div className='arrows-wrapper'>
                <ArrowRightAltIcon
                    style={{ color: blue[500] }}
                    className={`arrow${pageNum > 1 ? ' visible' : ''}`}
                    onClick={() => handleChangePageNum('left')}
                />
                <ArrowRightAltIcon
                    style={{ color: blue[500] }}
                    className={`arrow${pageNum < (weatherItems.length / pageSize) ? ' visible' : ''}`}
                    data-testid="next-icon"
                    onClick={() => handleChangePageNum('right')}
                />
            </div>
            <div>
                <div>
                    <div id="cards-wrapper" data-testid="cards-wrapper">
                        {weatherItems.map((item) => (
                            <WeatherCard
                                {...item}
                                isInView={itemsInView.some(x => x.key === item.key)}
                                isSelected={selectedWeatherCardKey === item.key}
                                onClick={() => setSelectedWeatherCardKey(item.key)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className='bar-chart-wrapper'>
                <ResponsiveContainer width={isDesktop ? '70%' : '100%'} height={250}>
                    <BarChart width='100%' height='100%' data={weatherCardSegments}>
                        <XAxis dataKey="label" />
                        <Tooltip cursor={{fill: '#b1dbfd'}} content={<CustomTooltip />} />
                        <Bar dataKey="temp" fill="#2196f3" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    weatherItems: selectWeatherItems(state)
});

export default connect(mapStateToProps, {})(WeatherInfo);
