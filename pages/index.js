"use client";
// pages/index.js
import { Suspense } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

import React from 'react';


const HomePage = () => {
  const allOrgs = useQuery(api.organizations.getAllOrgs);
  const allCampaigns = useQuery(api.monetaryCampaigns.getAllMonCamps);

  const postNewOrg = useMutation(api.organizations.postNewOrg)
  const postOrgCampaign = useMutation(api.organizations.postOrgCampaign)
  const t = useQuery(api.monetaryCampaigns.getMonCampsByIds, {campIds: [
    "j5788c49vagpymvtmppg3gcey56knvb6",
    "j57anb4bqw8jtcb8fbymyz5r596km0f1",
    "j5752p5txdatrjk4ffkebgxj4n6kmgyn",
    "j57cftkr09v41e20vt2g68ax0x6kmamf",
  ]})
  console.log(t)

  return (
      <div>
        <h1>Welcome to the Marketplace App</h1>
        <p>This is the homepage of the Marketplace App.</p>
        {allOrgs?.map((org, i) => 
          <>
            <h2>{org.name}</h2>
            <button onClick={() => postOrgCampaign({"campaignTitle": "Test Campaign " + i,"organizationID": org._id, "goalAmount": 100000, "goalDate": 1000000000, "contributions": [{"amount": 100000}]})}>Click me bitch {i + 1}</button>
          </>
        )}
        <button onClick={() => postNewOrg({name: "Test Organization " + allOrgs?.length})}>Click me bitch</button>

        {allCampaigns?.map((camp, i) => 
          <>
            <h2>{camp.campaignTitle}</h2>
          </>
        )}
      </div>
  );
};

export default HomePage;
