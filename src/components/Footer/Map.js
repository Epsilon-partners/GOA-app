import React from 'react';
import { Col } from 'react-bootstrap';
import { useGoogleMaps } from 'react-hook-google-maps';


const Map = () => {
    const { ref, map, google } = useGoogleMaps(
        "AIzaSyAJ18unufJihyeiWr5-RsXURTUACQOTw9s", 
        {
            center: {lat: 45.1930081, lng:5.7302905},
            zoom: 14
        }
    );

    return (
        <Col className="d-flex justify-content-center">
            <div ref={ref} style={{width: '70%', height: '100%'}} />
        </Col>
    )
}

 
export default Map;