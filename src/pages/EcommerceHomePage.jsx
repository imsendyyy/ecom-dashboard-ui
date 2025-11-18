import React, { useCallback, useEffect, useState } from 'react';
import Header from '../component/Header';
import Section from '../component/Section';
import useProducts from '../hooks/useProducts';
import { fetchPublicIp, fetchIpLocation, requestBrowserLocation } from '../utils/detectLocation';


export default function EcommerceHomePage() {
    const { sections, fetchAll, retrySection } = useProducts();


    const [ip, setIp] = useState(null);
    const [locationLabel, setLocationLabel] = useState('Detecting...');
    const [gpsStatus, setGpsStatus] = useState('unknown');


    const detectLocation = useCallback(async () => {
        setGpsStatus('requesting');
        const controller = new AbortController();


        try {
            // try browser location (one-shot)
            const pos = await requestBrowserLocation({ maximumAge: 1000 * 60 * 5, timeout: 8000 });
            const { latitude, longitude } = pos.coords;
            setGpsStatus('allowed');
            setLocationLabel(`Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`);
        } catch (err) {
            // fallback to IP
            setGpsStatus(err?.code === 1 ? 'denied' : 'failed');
            try {
                const publicIp = await fetchPublicIp();
                setIp(publicIp);
                const ipGeo = await fetchIpLocation(publicIp);
                const label = ipGeo?.city ? `${ipGeo.city}, ${ipGeo.region}, ${ipGeo.country_name}` : `${ipGeo?.region ?? 'Unknown region'}, ${ipGeo?.country_name ?? 'Unknown country'}`;
                setLocationLabel(label);
            } catch {
                setLocationLabel('Unable to detect location');
            }
        }


        return () => controller.abort();
    }, []);


    useEffect(() => {
        detectLocation();
        // products hook fetches already on mount
    }, [detectLocation]);


    const retryAll = useCallback(() => {
        fetchAll();
        detectLocation();
    }, [fetchAll, detectLocation]);


    return (
        <div>
            <Header ip={ip} locationLabel={locationLabel} gpsStatus={gpsStatus} onRetry={detectLocation} />


            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h3 className="mb-0">Welcome</h3>
                    <div>
                        <button className="btn btn-success btn-sm me-2" onClick={retryAll}>Refresh All</button>
                    </div>
                </div>


                <Section title="Frequently Bought" sectionState={sections.frequentlyBought} onRetry={() => retrySection('frequentlyBought')} />
                <Section title="Suggested For You" sectionState={sections.suggested} onRetry={() => retrySection('suggested')} />
                <Section title="Best Deals Today" sectionState={sections.bestDeals} onRetry={() => retrySection('bestDeals')} />
                <Section title="Out of Stock Today" sectionState={sections.outOfStock} onRetry={() => retrySection('outOfStock')} />


            </div>
        </div>
    );
}