import React from 'react';
import mockdata from '../path/to/mockdata.json';

const viewOrg = ({ id }) => {
    // Find the item with the matching ID
    const item = mockdata.find(item => item.id === parseInt(id));

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

export async function getServerSideProps(context) {
    const { id } = context.query;

    return {
        props: {
            id,
        },
    };
}

export default viewOrg;
