// @flow 
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';
import { Action } from '../action/action.component';
type Props = {
    
};
export const AdminNav = (props: Props) => {
    return (
        <>
        <header className='header' style={{ position: 'fixed', top:0 }}>
          <nav className='row container'>
            <Link href='/'>
              <Image src='/static/logos/ahoy-logo-white.png' height='64' width='315' alt='Ahoy House logo' />
            </Link>
            <ul className='menu__links'>
              <li>
                <Link className='btn--link' href='/admin/add-property'>
                  Add property
                </Link>
              </li>
              <li>
                <Link className='btn--link' href='/'>
                  Property List
                </Link>
              </li>
              <li>
                <Link className='btn--link' href='/'>
                  Order History
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
};