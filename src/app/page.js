"use client";
import React, { useState } from "react";
import { Card, Row, Col, Input } from "antd";
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { mockData } from './mockdata';

const { Search } = Input;
const { Meta } = Card;

const containerStyle = {
	width: '100%',
	height: '400px'
};

const center = {
	lat: 37.7749, // Latitude of San Francisco
	lng: -122.4194 // Longitude of San Francisco
};

const HomePage = () => {
	const [filteredData, setFilteredData] = useState(mockData);
	const [selectedItem, setSelectedItem] = useState(null);

	const onMarkerClick = (item) => {
		setSelectedItem(item);
	};

	const closeModal = () => {
		setSelectedItem(null);
	};

	const onSearch = (value) => {
		const lowerCaseValue = value.toLowerCase();
		const filtered = mockData.filter(item =>
			item.title.toLowerCase().includes(lowerCaseValue) ||
			item.description.toLowerCase().includes(lowerCaseValue)
		);
		setFilteredData(filtered);
	};

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
	  // This is just an example of getting and using the map instance!!! don't just blindly copy!
	  setMap(map);
	}, []);
  
	const onUnmount = React.useCallback(function callback(map) {
	  setMap(null);
	}, []);

	return (
		<div style={{ padding: "20px", height: "calc(100vh - 160px)", overflowY: "auto" }}>
			<h1 style={{ color: "#1E1E1E", textAlign: 'left', marginBottom: '20px' }}>Discover</h1>
			<p style={{ color: "#929292", textAlign: 'left', marginBottom: '40px' }}>Discover sustainable ways to support local business and non-profit organizations (NPOs) through eco-friendly practices like in-kind donations, financial contributions, and volunteer efforts, fostering positive change in your community.</p>
			<Search placeholder="Search..." onChange={onSearch} style={{ width: '100%', marginBottom: '20px' }} />
			<LoadScript
				googleMapsApiKey="AIzaSyCCu4rPIMPW37A12h15LdaEUic9o79SVAc"
				style={{ borderRadius: "10px" }}
			>
				<GoogleMap
					mapContainerStyle={containerStyle}
					center={center}
					zoom={10}
					onLoad={onLoad}
					onUnmount={onUnmount}
					options={{
						gestureHandling: "cooperative" // Set gestureHandling to "cooperative"
					}}
				>
					{filteredData.map(item => (
						<Marker
							key={item.id}
							position={{ lat: item.lat, lng: item.lng }}
							onClick={() => onMarkerClick(item)}
						>
							{selectedItem === item && (
								<InfoWindow onCloseClick={closeModal} options={{ maxWidth: 300 }} >
									<div>
										<h3 style={{ color: 'black' }}>{item.title}</h3>
										<br></br>
										<p style={{ color: 'black' }}>{item.description}</p>
										<br></br>
										<p style={{ color: 'black' }}>{item.type}</p>
									</div>
								</InfoWindow>
							)}
						</Marker>
					))}
				</GoogleMap>
			</LoadScript>

			<div style={{ marginBottom: '30px', marginTop: '30px' }}>
				<Row gutter={[16, 16]}>
					{filteredData.map(item => (
						<Col key={item.id} span={8} padding={8}>
							<Card
								hoverable
								cover={<img alt="example" src={item.imageUrl} />}
							>
								<Meta title={item.title} description={item.description} />

								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
									<p style={{ color: '#176B39', backgroundColor: item.type === 'monetary' ? '#EFFFEA' : 'transparent', paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px', marginRight: '8px' }}>{item.type}</p>
									<button style={{ backgroundColor: 'blue', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>Learn More</button>
								</div>

							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
}

export default HomePage;