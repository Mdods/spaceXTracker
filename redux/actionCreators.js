import {FILTER_BY_DATE, FILTER_BY_YEAR} from './actionTypes';

export const  FilterByDate = (date) => ({
  type: FILTER_BY_DATE,
  payload: {
    date: date
  }
    
})

export const FilterByYear = (year) => ({
  type: FILTER_BY_YEAR,
  payload: {
    year: year,
  }
});