"use client";
import React, { useState } from "react";
import { Card, Row, Col, Input } from "antd";
import { GoogleMap, Marker, LoadScript, useJsApiLoader} from '@react-google-maps/api';

const { Search } = Input;
const { Meta } = Card;

const mockData = [
	{
		id: 1,
		imageUrl: "https://via.placeholder.com/150",
		title: "Green Community Initiative",
		description: "A sustainable project aimed at promoting environmental awareness and eco-friendly practices within the community. Join us in our efforts to plant trees, clean up parks, and reduce carbon footprint.",
		type: "in-kind",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 2,
		imageUrl: "https://via.placeholder.com/150",
		title: "Youth Empowerment Program",
		description: "Empowering the youth through education, skill development, and mentorship. Our program aims to provide opportunities for personal growth, leadership training, and community involvement.",
		type: "volunteers",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 3,
		imageUrl: "https://via.placeholder.com/150",
		title: "Community Food Drive",
		description: "Join us in fighting hunger and food insecurity in our community. Together, we can collect and distribute nutritious meals to those in need, ensuring that no one goes to bed hungry.",
		type: "in-kind",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 4,
		imageUrl: "https://via.placeholder.com/150",
		title: "Tech for Good Hackathon",
		description: "Calling all tech enthusiasts! Join our hackathon to develop innovative solutions to address social and environmental challenges. Let's use technology for positive change!",
		type: "volunteers",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 5,
		imageUrl: "https://via.placeholder.com/150",
		title: "Community Health Initiative",
		description: "Promoting health and wellness in our community through education, access to healthcare services, and disease prevention programs. Join us in building a healthier future for all.",
		type: "monetary",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 6,
		imageUrl: "https://via.placeholder.com/150",
		title: "Arts for All Project",
		description: "Bringing arts and culture to every corner of our community. Join us in celebrating creativity, diversity, and expression through various artistic endeavors and events.",
		type: "in-kind",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 7,
		imageUrl: "https://via.placeholder.com/150",
		title: "Education for Everyone Campaign",
		description: "Ensuring equal access to quality education for all members of our community. Join our campaign to support schools, provide scholarships, and empower learners of all ages.",
		type: "monetary",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 8,
		imageUrl: "https://via.placeholder.com/150",
		title: "Environmental Cleanup Initiative",
		description: "Taking action to protect our environment and preserve natural resources. Join our cleanup efforts to remove litter, reduce pollution, and restore the beauty of our surroundings.",
		type: "volunteers",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	},
	{
		id: 9,
		imageUrl: "https://via.placeholder.com/150",
		title: "Community Volunteer Corps",
		description: "Calling all volunteers! Join our corps and make a difference in the lives of others. From community events to humanitarian missions, there's always an opportunity to serve.",
		type: "in-kind",
		lat: 37.7749 + (Math.random() - 0.5) * 0.1,
		lng: -122.4194 + (Math.random() - 0.5) * 0.1
	}
];


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
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: "YOUR_API_KEY"
	});

	const [map, setMap] = React.useState(null);

	const onLoad = React.useCallback(function callback(map) {
		setMap(map);
	}, []);

	const onUnmount = React.useCallback(function callback(map) {
		setMap(null);
	}, []);

	const onSearch = (value) => {
		const lowerCaseValue = value.toLowerCase();
		const filtered = mockData.filter(item =>
			item.title.toLowerCase().includes(lowerCaseValue) ||
			item.description.toLowerCase().includes(lowerCaseValue)
		);
		setFilteredData(filtered);
	};

	return (
		<div style={{ padding: "20px", height: "calc(100vh - 160px)", overflowY: "auto" }}>
			<h1 style={{ color: "#1E1E1E", textAlign: 'left', marginBottom: '20px' }}>Discover</h1>
			<p style={{ color: "#929292", textAlign: 'left', marginBottom: '40px' }}>Discover sustainable ways to support local business and non-profit organizations (NPOs) through eco-friendly practices like in-kind donations, financial contributions, and volunteer efforts, fostering positive change in your community.</p>
			<Search placeholder="Search..." onSearch={onSearch} style={{ width: '100%', marginBottom: '20px' }} />
			<LoadScript
				googleMapsApiKey="AIzaSyCCu4rPIMPW37A12h15LdaEUic9o79SVAc"
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
						<Marker key={item.id} position={{ lat: item.lat, lng: item.lng }} />
					))}
				</GoogleMap>
			</LoadScript>

			<div style={{ marginBottom: '30px', marginTop: '30px' }}>
				<Row gutter={[16, 16]}>
					{filteredData.map(item => (
						<Col key={item.id} span={8} padding={4}>
							<Card
								hoverable
								cover={<img alt="example" src={item.imageUrl} />}
							>
								<Meta title={item.title} description={item.description} />
								<p>{item.type}</p>
							</Card>
						</Col>
					))}
				</Row>
			</div>
		</div>
	);
}

export default HomePage;
