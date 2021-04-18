import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { within } from '@testing-library/dom'
import { WeatherInfo } from '../../../components/weather-info';

describe('Weather Info Page', () => {
    beforeEach(() => {
        const weatherItems = [
            {
                "key": "16-Apr-2021",
                "date": "16 Apr 21",
                "averageTemp": 274.99,
                "segments": [
                    {
                        "time": "10:00 PM",
                        "temperature": 274.99
                    }
                ]
            },
            {
                "key": "17-Apr-2021",
                "date": "17 Apr 21",
                "averageTemp": 276.96500000000003,
                "segments": [
                    {
                        "time": "01:00 AM",
                        "temperature": 273.84
                    },
                    {
                        "time": "04:00 AM",
                        "temperature": 272.32
                    },
                    {
                        "time": "07:00 AM",
                        "temperature": 273.6
                    },
                    {
                        "time": "10:00 AM",
                        "temperature": 279.73
                    },
                    {
                        "time": "01:00 PM",
                        "temperature": 280.7
                    },
                    {
                        "time": "04:00 PM",
                        "temperature": 280.65
                    },
                    {
                        "time": "07:00 PM",
                        "temperature": 277.94
                    },
                    {
                        "time": "10:00 PM",
                        "temperature": 276.94
                    }
                ]
            },
            {
                "key": "18-Apr-2021",
                "date": "18 Apr 21",
                "averageTemp": 277.08625,
                "segments": [
                    {
                        "time": "01:00 AM",
                        "temperature": 275.97
                    },
                    {
                        "time": "04:00 AM",
                        "temperature": 275.5
                    },
                    {
                        "time": "07:00 AM",
                        "temperature": 275.74
                    },
                    {
                        "time": "10:00 AM",
                        "temperature": 276.95
                    },
                    {
                        "time": "01:00 PM",
                        "temperature": 278.39
                    },
                    {
                        "time": "04:00 PM",
                        "temperature": 279.27
                    },
                    {
                        "time": "07:00 PM",
                        "temperature": 277.8
                    },
                    {
                        "time": "10:00 PM",
                        "temperature": 277.07
                    }
                ]
            },
            {
                "key": "19-Apr-2021",
                "date": "19 Apr 21",
                "averageTemp": 278.22125000000005,
                "segments": [
                    {
                        "time": "01:00 AM",
                        "temperature": 277.02
                    },
                    {
                        "time": "04:00 AM",
                        "temperature": 276.95
                    },
                    {
                        "time": "07:00 AM",
                        "temperature": 277.01
                    },
                    {
                        "time": "10:00 AM",
                        "temperature": 277.95
                    },
                    {
                        "time": "01:00 PM",
                        "temperature": 279.14
                    },
                    {
                        "time": "04:00 PM",
                        "temperature": 281.9
                    },
                    {
                        "time": "07:00 PM",
                        "temperature": 279.05
                    },
                    {
                        "time": "10:00 PM",
                        "temperature": 276.75
                    }
                ]
            },
            {
                "key": "20-Apr-2021",
                "date": "20 Apr 21",
                "averageTemp": 279.41125,
                "segments": [
                    {
                        "time": "01:00 AM",
                        "temperature": 275.19
                    },
                    {
                        "time": "04:00 AM",
                        "temperature": 274.06
                    },
                    {
                        "time": "07:00 AM",
                        "temperature": 276.54
                    },
                    {
                        "time": "10:00 AM",
                        "temperature": 280.66
                    },
                    {
                        "time": "01:00 PM",
                        "temperature": 283.88
                    },
                    {
                        "time": "04:00 PM",
                        "temperature": 285.5
                    },
                    {
                        "time": "07:00 PM",
                        "temperature": 281.04
                    },
                    {
                        "time": "10:00 PM",
                        "temperature": 278.42
                    }
                ]
            },
            {
                "key": "21-Apr-2021",
                "date": "21 Apr 21",
                "averageTemp": 282.19,
                "segments": [
                    {
                        "time": "01:00 AM",
                        "temperature": 276.66
                    },
                    {
                        "time": "04:00 AM",
                        "temperature": 275.6
                    },
                    {
                        "time": "07:00 AM",
                        "temperature": 278.56
                    },
                    {
                        "time": "10:00 AM",
                        "temperature": 285.42
                    },
                    {
                        "time": "01:00 PM",
                        "temperature": 288.47
                    },
                    {
                        "time": "04:00 PM",
                        "temperature": 288.53
                    },
                    {
                        "time": "07:00 PM",
                        "temperature": 282.09
                    }
                ]
            }
        ];

        render(<WeatherInfo weatherItems={weatherItems} />);
    });

    it('should show 3 weather items on page load', () => {
        const weatherCards = screen.queryAllByTestId('visible-card');
        expect(weatherCards.length).toBe(3);
    });

    it('should should change the temperature to Celcius when Celcius radio button is clicked', () => {
        const celsiusRadioButton = screen.getByText('Celsius');
        fireEvent.click(celsiusRadioButton);

        const weatherCards = screen.getAllByTestId('visible-card');
        const firstCardElement = within(weatherCards[0]).getByText('134.99°C');

        expect(firstCardElement).toBeTruthy();
    });

    it('should show next weather items correctly on click of next button', () => {
        const next = screen.getByTestId('next-icon');
        fireEvent.click(next);

        const weatherCards = screen.getAllByTestId('visible-card');
        const nineTeenthAprCardElement = within(weatherCards[0]).getByText('19 Apr 21');

        expect(nineTeenthAprCardElement).toBeTruthy();
    });
});