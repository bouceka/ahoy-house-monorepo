import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import { Button } from '../components/button/button.component';
import { Header } from '../components/header/header.component';
import Link from 'next/link';
import { FeatureCard } from '../components/feature-card/feature-card.component';
import { PropertyCard } from '../components/property-card/property-card.component';
import { Action } from '../components/action/action.component';
import { Hero } from '../components/hero/hero.component';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header type='solid' imageExtend={false} position='sticky' />
      <main className={styles.main}>
        <Hero />
      </main>
    </>
  );
}
