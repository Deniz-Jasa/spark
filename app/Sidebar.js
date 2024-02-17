// app/components/Sidebar.js

import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div>
      <h2>Menu</h2>
      <ul>
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
        <li>
          <Link href="/about">
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
