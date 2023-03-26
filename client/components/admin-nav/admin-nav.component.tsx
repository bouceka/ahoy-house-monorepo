// @flow
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

export const AdminNav = () => {
  return (
    <>
      <header className="header" style={{ position: 'sticky', top: 0 }}>
        <nav className="row container">
          <h2 className="heading" style={{ color: '#fff' }}>
            Admin
          </h2>
          <ul className="menu__links">
            <li>
              <Link className="btn--header" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="btn--header" href="/admin/properties">
                Properties
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
