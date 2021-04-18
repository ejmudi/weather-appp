import { get } from "../utils/http-client";
import { baseApiUrl } from '../utils/constants';
import dayjs from "dayjs";
const groupBy = require('lodash/groupBy')

export const getWeatherItems = async () => (
  new Promise((resolve, reject) => {
    get(baseApiUrl, {
        q: 'Munich,de',
        APPID: '75f972b80e26f14fe6c920aa6a85ad57',
        cnt: 40
    }).then(response => {
      const groupedList = groupBy(response.data.list, x => dayjs(x.dt * 1000).format('DD-MMM-YYYY'));

      const weatherItems = Object.keys(groupedList).map(formattedDate => {
        const weatherList = groupedList[formattedDate];
  
        const temperatureSum = weatherList.reduce((a, b) => {
          return a + b.main.temp;
        }, 0);
  
        const averageTemp = temperatureSum / weatherList.length;
  
        return {
          key: formattedDate,
          date: dayjs(weatherList[0].dt * 1000).format('DD MMM YY'),
          averageTemp,
          segments: weatherList.map(x => ({
            time: dayjs(x.dt * 1000).format('hh:mm A'),
            temperature: x.main.temp
          }))
        };
      });
  
      resolve(weatherItems);
    }
    ).catch(reject)
  })
);