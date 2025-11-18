import axios from 'axios';


export async function fetchPublicIp(signal) {
    const res = await axios.get('https://api.ipify.org?format=json', { signal });
    return res.data.ip;
}


export async function fetchIpLocation(ip, signal) {
    const res = await axios.get(`https://ipapi.co/${ip}/json/`, { signal });
    return res.data; // { city, region, country_name, ... }
}


export function requestBrowserLocation(options = {}) {
    // Wrap getCurrentPosition in a Promise
    return new Promise((resolve, reject) => {
        if (!('geolocation' in navigator)) {
            reject({ code: 0, message: 'Geolocation not supported' });
            return;
        }


        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(pos),
            (err) => reject(err),
            options
        );
    });
}