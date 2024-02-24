"use client";
import React, { useState, useEffect} from "react";
import { Card, Row, Col, Input } from "antd";
import { GoogleMap, Marker, LoadScript, InfoWindow } from '@react-google-maps/api';
import { mockData } from './mockdata';
import { redirect } from 'next/navigation';
import { useAction, useQuery } from 'convex/react';
import { api } from "../../convex/_generated/api";
import { navigate } from "@/components/serverActions";

const { Search } = Input;
const { Meta } = Card;

const containerStyle = {
	width: '100%',
	height: '400px'
};

const center = {
	lat: 37.630720, 
	lng: -122.269546 // Longitude of San Francisco
};

const getTypeStyles = (type) => {
	switch (type) {
		case 'material':
			return {
				backgroundColor: '#FFF0F0', // Dark red
				color: '#A63737'
			};
		case 'volunteering':
			return {
				backgroundColor: '#F0F8FF', // Light blue
				color: '#1664B1' // Dark blue
			};
		case 'donation':
			return {
				backgroundColor: '#EFFFEA', // Light green
				color: '#176B39' // Dark green
			};
		default:
			return {
				backgroundColor: 'transparent',
				color: 'black'
			};
	}
};

const HomePage = () => {
	const allCamps = useQuery(api.campaigns.getAllMonCamps);
	const [filteredData, setFilteredData] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	const getOrg = useAction(api.organizations.getOrgById);

	const onMarkerClick = (item) => {
		setSelectedItem(item);
	};

	const closeModal = () => {
		setSelectedItem(null);
	};

	const handleSearch = (value) => {
		const lowerCaseValue = value.toLowerCase();
		const filtered = allCamps.filter(item =>
			item.campaignTitle.toLowerCase().includes(lowerCaseValue) ||
			item.description.toLowerCase().includes(lowerCaseValue) || 
			item.goal.type.toLowerCase().includes(lowerCaseValue)		);
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

	const handleCardClick = (id) => {
		let route = '/viewOrg?id=' + id
		console.log(route)
        redirect(route);
    };

	useEffect(() => {
		console.log(filteredData, allCamps)
		if (!filteredData && !!allCamps) {
			setFilteredData(allCamps);
		}
	}, [allCamps]);
	console.log(filteredData)

	return (
		<div style={{ padding: "20px", height: "calc(100vh - 160px)", overflowY: "auto" }}>
			<h1 style={{ color: "#1E1E1E", textAlign: 'left', marginBottom: '20px' }}>Discover</h1>
			<p style={{ color: "#929292", textAlign: 'left', marginBottom: '40px' }}>Discover sustainable ways to support local business and non-profit organizations (NPOs) through eco-friendly practices like in-kind donations, financial contributions, and volunteer efforts, fostering positive change in your community.</p>
			<Search placeholder="Search..." onChange={(e) => handleSearch(e.target.value)} style={{ width: '100%', marginBottom: '20px' }} />
			<LoadScript
				googleMapsApiKey="enter_key"
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
					{!!filteredData && filteredData.map(item => (
						<Marker
							key={item.id}
							position={{ lat: item?.lat, lng: item?.lng }}
							onClick={() => onMarkerClick(item)}
						>
							{selectedItem === item && (
								<InfoWindow onCloseClick={closeModal} options={{ maxWidth: 300 }} >
									<div>
										<h3 style={{ color: 'black' }}>{item.campaignTitle}</h3>
										<br></br>
										<p style={{ color: 'black' }}>{item.description}</p>
										<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
											<p style={{ ...getTypeStyles(item.goal.type), paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px', marginRight: '8px' }}>{item.goal.type}</p>
											<button onClick={async() => {navigate((await getOrg({orgId: item.organizationID})).websiteURL)}}  style={{ backgroundColor: '#ff8947', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>Learn More</button>
										</div>
									</div>
								</InfoWindow>
							)}
						</Marker>
					))}
				</GoogleMap>
			</LoadScript>

			<div style={{ marginBottom: '30px', marginTop: '30px' }}>
				<Row gutter={[16, 16]}>
					{!!filteredData && filteredData.map(item => (
						<Col key={item._id} span={8} padding={8}>
							<Card
								hoverable
								onClick={() => handleCardClick(item._id)}>
								<Meta title={
									<div>
										<h3 style={{textAlign: 'left', marginBottom: '4px'}}>
											{item.campaignTitle}
										</h3>
										<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
											<h5 style={{ color: 'gray', textAlign: 'left'}}>
												Looking for {item.goal.goalAmount} by {(new Date(item.goal.goalDate)).toLocaleDateString()}
											</h5>
											<p style={{ ...getTypeStyles(item.goal.type), paddingLeft: '8px', paddingRight: '8px', borderRadius: '4px', marginRight: '8px', fontWeight: 400, fontSize: '14px'}}>{item.goal.type}</p>
										</div>
									</div>
									} description={
										<p style={{textAlign: 'left'}}>
											{item.description}
										</p>} />

								<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '30px' }}>
									{item.location && <p style={{ color:'#8C8C8C', textAlign: 'left', flex: 1}}><span style={{fontWeight:'bold'}}>Location:</span> {item.location}</p>}

									<button onClick={async() => {navigate((await getOrg({orgId: item.organizationID})).websiteURL)}} style={{ backgroundColor: '#ff8947', border: 'none', padding: '8px 16px', borderRadius: '4px' }}>Learn More</button>
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
