export const fetchLaunchData = () => fetch('https://api.spacexdata.com/v3/launches')
.then(res => res.status <= 401 ? res : Promise.reject(new Error('fail')))
    .then(res => res.status === 204 ? res : res.json())
    .catch(err => console.log('error is:', err));