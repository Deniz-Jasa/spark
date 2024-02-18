import React from 'react';
import { Button, Card, Flex, Space } from 'antd';

const cardHeader = () => <><h2>Organization</h2><a target="_blank" href='https://www.google.com'>URL</a></>

const Org = () => (
//   <Flex wrap="wrap" gap="middle" justify="flex-start">
      <Card 
        title = {cardHeader()}
        align="left"
        style={{width: 300, float: 'left'} }
      >
        <p>Here's the organization's description as they entered it.</p>
        <br></br>
        <p> - In need of 2 hour clean up </p>
        <p> - In need of 2 hour clean up</p>
        <br></br>
        <Flex justify='space-between'>
          <Button>Sign Up</Button>
          <Button>Message</Button>
        </Flex>
      </Card>
//   </Flex>
);
export default Org;