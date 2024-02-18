import React from 'react';
import {mockData} from '../mockdata.js';
import { useSearchParams } from 'next/navigation'

const viewOrg = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    // Find the item with the matching ID
    const item = mockData.find(item => item.id === parseInt(id));

    // If item is not found, return a message or handle it as needed
    if (!item) {
        return <div>Item not found</div>;
    }

    return (
        <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Location: {item.location}</p>
            <p>Type: {item.type}</p>
        </div>
    );
};

export default viewOrg;
