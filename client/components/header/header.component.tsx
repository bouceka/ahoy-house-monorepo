// @flow
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Action } from '../action/action.component';
import useWindowDimensions from '../../hooks/window-dimension';
type Props = {
  position: 'static' | 'relative' | 'absolute' | 'sticky' | 'fixed';
  imageExtend: boolean;
  type: 'transparent' | 'solid';
};
export const Header = ({ position, imageExtend = false, type = 'solid' }: Props) => {
  const { width, height } = useWindowDimensions();
  return (
    <>
      <header className='header' style={{ position: position }}>
        <div className='row'>
          <nav className=' container'>
            <Link href='/'>
              {width && width >= 600 ? (
                <Image src='/static/logos/ahoy-logo-white.png' height='64' width='315' alt='Ahoy House logo' />
              ) : (
                <Image src='/static/logos/ahoy-logo-small.png' height='64' width='64' alt='Ahoy House logo' />
              )}
            </Link>
            <input className='menu__btn' type='checkbox' id='menu-btn' />
            <label className='menu__icon' htmlFor='menu-btn'>
              <span className='icon'></span>
            </label>

            <ul className='menu__links'>
              <li>
                <Link className='btn--link' href='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link className='btn--link' href='/properties'>
                  Properties
                </Link>
              </li>
              <li>
                <Action as='button' styleType='secondary'>
                  Sign Up
                </Action>
              </li>
              {/* <li>
              <Link className='btn--link' href='/'>
              About
              </Link>
            </li> */}
            </ul>
            {/* <ul className='menu__login'>
            <li>
            <Link className='btn--link' href='/login'>
            Login
            </Link>
            </li>
            
          </ul> */}
          </nav>
        </div>
        {imageExtend ? <div className='header__image'></div> : null}
      </header>
    </>
  );
};
