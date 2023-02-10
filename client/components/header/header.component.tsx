// @flow
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Button } from '../button/button.component';
type Props = {
  position: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  imageExtend: boolean;
  type: 'transparent' | 'solid';
};
export const Header = ({ position, imageExtend }: Props) => {
  return (
    <>
      <header className='header' style={{ position: position }}>
        <nav className='row container'>
          <Link href='/'>
            <Image src='/static/logos/ahoy-logo-white.png' height='64' width='315' alt='Ahoy House logo' />
          </Link>
          <ul className='menu__links'>
            <li>
              <Link className='btn--link' href='/'>
                Home
              </Link>
            </li>
            <li>
              <Link className='btn--link' href='/'>
                Properties
              </Link>
            </li>
            <li>
              <Link className='btn--link' href='/'>
                About
              </Link>
            </li>
          </ul>
          <ul className='menu__login'>
            <li>
              <Link className='btn--link' href='/'>
                Login
              </Link>
            </li>
            <li>
              <Button className='secondary'>Sign Up</Button>
            </li>
          </ul>
        </nav>
      </header>
      {imageExtend ? <div className='header__image'></div> : null}
    </>
  );
};
