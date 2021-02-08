import React from 'react';
import { Col } from 'react-bootstrap';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


class Map extends React.Component  {

    render () {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap 
                defaultCenter={{lat: 45.1930081, lng: 5.7302905}}
                defaultZoom={15}
            >
                {props.isMarkerShown && 
                    <Marker position={{lat: 45.1930081, lng: 5.7302905}} />
                }
            </GoogleMap>
        ))
    
        return (
            <Col className="d-flex justify-content-center">
                <GoogleMapExample
                    isMarkerShown
                    containerElement={<div style={{height: '100%', width: '70%'}} />}
                    mapElement={<div style={{height: '100%', width: '100%'}} />}
                />
            </Col>
        );
    };
    
};

 
export default Map;