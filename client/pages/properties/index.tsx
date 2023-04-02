import 'rc-dropdown/assets/index.css';

import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import { SelectEventHandler } from 'rc-menu/lib/interface';
import { useState } from 'react';
import { sortBy } from 'sort-by-typescript';

import { GET_ACTIVE_PROPERTIES } from '../../apollo/property-queries';
import { Breadcrumbs } from '../../components/breadcrumbs/breadcrumbs.components';
import { Header } from '../../components/header/header.component';
import { PropertyCard } from '../../components/property-card/property-card.component';
import ChevronDown from '../../public/icons/chevron/down.svg';
import { Property } from '../../types/property';
import { apolloClient } from '../../utils/apollo-client';

interface Props {
  propertyList: Property[];
}

const mapPropertiesToGetPriceFrom = (property: Property): Property => ({
  ...property,
  priceFrom:
    property.rooms.length > 0
      ? property.rooms.reduce((accumulator, price) =>
          accumulator.pricePerNight < price.pricePerNight ? accumulator : price,
        ).pricePerNight
      : null,
});

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { data } = await apolloClient.query({
    query: GET_ACTIVE_PROPERTIES,
  });
  return {
    props: {
      propertyList: data.getAllActiveProperties.map(mapPropertiesToGetPriceFrom),
    },
  };
};

enum SortBySelect {
  lowPrice = 'Price Low To High',
  highPrice = 'Price High To Low',
  highRating = 'Rating High To Low',
  lowRating = 'Rating Low To High',
  DEFAULT = 'Default',
}

export default function Properties({ propertyList, ...props }: Props) {
  const [sortBySelect, setSortBySelect] = useState<SortBySelect>(SortBySelect.DEFAULT);
  const [properties, setProperties] = useState<Property[]>(propertyList);
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleSortBy = (select: SortBySelect) => {
    switch (select) {
      case SortBySelect.highPrice:
        setProperties([...properties].sort(sortBy('-priceFrom')));
        break;
      case SortBySelect.lowPrice:
        setProperties([...properties].sort(sortBy('priceFrom')));
        break;
      case SortBySelect.lowRating:
        setProperties([...properties].sort(sortBy('rating')));
        break;
      case SortBySelect.highRating:
        setProperties([...properties].sort(sortBy('-rating')));
        break;
      default:
        return;
    }
  };

  function onSelect({ key }: any) {
    handleSortBy(key);
    setSortBySelect(key);
  }

  function onVisibleChange(visible: boolean) {
    setOpenDropDown(!openDropDown);
  }

  //TODO: Create your own dropdown
  const menu = (
    <Menu onSelect={onSelect} style={{ padding: '.8rem', fontSize: '1.6rem' }}>
      <MenuItem style={{ padding: '.8rem' }} key="0" disabled>
        Default
      </MenuItem>
      <MenuItem
        style={{ padding: '.8rem' }}
        className="sort-item"
        key={SortBySelect.lowRating}
      >
        Rating Low To High
      </MenuItem>
      <MenuItem
        style={{ padding: '.8rem' }}
        className="sort-item"
        key={SortBySelect.highRating}
      >
        Rating High To Low
      </MenuItem>
      <MenuItem
        style={{ padding: '.8rem' }}
        className="sort-item"
        key={SortBySelect.lowPrice}
      >
        Price Low To High
      </MenuItem>
      <MenuItem
        style={{ padding: '.8rem' }}
        className="sort-item"
        key={SortBySelect.highPrice}
      >
        Price High To Low
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Head>
        <title>Properties | Ahoy House</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="language" content="en" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header imageExtend={true} type="solid" position="sticky" />
      <main>
        <div className="row page ">
          <div className="page-title">
            <h2 className="heading--bold">Our Properties</h2>
            <div className='sort-by-section'>
              <span>Sort by:</span>
              <Dropdown
                trigger={['click']}
                overlay={menu}
                animation="slide-up"
                onVisibleChange={onVisibleChange}
              >
                <button className="sort-by">
                  {sortBySelect}
                  <ChevronDown
                    className={`rotate-chevron ${openDropDown ? 'active' : ''}`}
                  />
                </button>
              </Dropdown>
            </div>
          </div>
          <section className="properties-grid">
            {properties
              ? properties.map((property, index) => (
                  <PropertyCard key={index} property={property} index={index} />
                ))
              : null}
          </section>
        </div>
      </main>
    </>
  );
}
