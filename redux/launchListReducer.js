import  initialState  from './initialState';
import {FILTER_BY_DATE, FILTER_BY_YEAR} from './actionTypes';


const launchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_DATE:
      return { ...state, launchData: [...state, action.payload] };
    case FILTER_BY_YEAR:
      return {
        ...state,
        launchData: [...state.launchData.filter((launch) => {
          return launch.launch_year == action.payload.year
        })]
      }
      default:
        return state;
      }
    };
    
    export default launchListReducer;