// @flow
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Action } from '../action/action.component';
type Props = {};
export const AdminNav = (props: Props) => {
  return (
    <>
      <header className='header' style={{ position: 'sticky', top: 0 }}>
        <nav className='row container'>
          <h2 className='heading' style={{ color: '#fff' }}>
            Admin
          </h2>
          <ul className='menu__links'>
            <li>
              <Link className='btn--link' href='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='btn--link' href='/admin/properties'>
                Properties
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
