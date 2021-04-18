import React, { useState, useEffect } from 'react';
import { blue } from '@material-ui/core/colors';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { selectWeatherItems } from '../../selectors';
import { connect } from 'react-redux';
import { BarChart, Bar, XAxis, Tooltip } from 'recharts';
import './index.scss';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        flexGrow: 1
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    radioColor: {
        color: blue[400],
        '&$checked': {
            color: blue[600],
        },
    },
    selectedCard: {
        backgroundColor: 'red'
    }
}));

export const WeatherInfo = ({ weatherItems }) => {
    const getWeatherItemsByPage = () => weatherItems.slice(pageSize * (pageNum - 1), pageSize * pageNum);

    const TemperatureTypeEnum = {
        CELSIUS: '1',
        FAHRENHEIT: '2'
    };
    Object.freeze(TemperatureTypeEnum);
    const pageSize = 3;

    const classes = useStyles();

    const [pageNum, setPageNum] = useState(1);
    const [temperatureType, setTemperatureType] = useState(TemperatureTypeEnum.FAHRENHEIT);
    const [selectedWeatherCardKey, setSelectedWeatherCardKey] = useState();

    useEffect(() => {
        setSelectedWeatherCardKey(getWeatherItemsByPage()[0]?.key);
    }, [pageNum]);

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
            <div className='weather-card' data-testid={`${isInView ? 'visible-card' : 'hidden-card'}`}>
                <Card className={isSelected ? classes.selectedCard : classes.root} variant='outlined' onClick={onClick}>
                    <CardContent>
                        <Typography variant="h6">Temp:</Typography>
                        <Typography variant="body2">{renderTemperature(averageTemp)}</Typography>
                        <Typography variant="h6">Date:</Typography>
                        <Typography variant="body2">{date}</Typography>
                    </CardContent>
                </Card>
            </div>
        );
    };

    const selectedWeatherCard = getWeatherItemsByPage().find(x => x.key === selectedWeatherCardKey);
    const weatherCardSegments = selectedWeatherCard?.segments?.map(x => ({
        label: `${getTemperature(x.temperature).toFixed(2)}${temperatureType === TemperatureTypeEnum.FAHRENHEIT ? 'F' : 'C'}`,
        temp: getTemperature(x.temperature),
        segment: x.time
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{payload[0].payload.segment}</p>
                    <p className="label">{`${payload[0].dataKey} : ${label}`}</p>
                </div>
            );
        }

        return null;
    };

    const itemsInView = getWeatherItemsByPage();

    return (
        <div className='weather-info-page'>
            <div>
                <RadioGroup row aria-label="temperature" name="temperature" value={temperatureType} onChange={handleChangeTemperatureType}>
                    <FormControlLabel value={TemperatureTypeEnum.CELSIUS} control={<BlueRadio />} label="Celsius" />
                    <FormControlLabel value={TemperatureTypeEnum.FAHRENHEIT} control={<BlueRadio />} label="Fahrenheit" />
                </RadioGroup>
            </div>
            <div>
                {
                    pageNum > 1 &&
                    <ArrowRightAltIcon
                        style={{
                            color: blue[500],
                            fontSize: 100,
                            transform: 'rotate(180deg)'
                        }}
                        onClick={() => handleChangePageNum('left')}
                    />
                }
                {
                    pageNum < (weatherItems.length / pageSize) &&
                    <ArrowRightAltIcon
                        style={{
                            color: blue[500],
                            fontSize: 100
                        }}
                        data-testid="next-icon"
                        onClick={() => handleChangePageNum('right')}
                    />
                }
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
            <div>
                <BarChart width={730} height={250} data={weatherCardSegments}>
                    <XAxis dataKey="label" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="temp" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    weatherItems: selectWeatherItems(state)
});

export default connect(mapStateToProps, {})(WeatherInfo);