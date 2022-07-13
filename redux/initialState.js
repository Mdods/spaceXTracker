import {fetchLaunchData} from "../services/apiFetch";
const initialState = {
  launchData: fetchLaunchData(),
};

export default initialState;