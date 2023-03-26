// @flow
import { useRouter } from 'next/router';
import * as React from 'react';

import { Action } from '../action/action.component';

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const styleCrumb = (crumb: string) => {
  return capitalize(crumb.replace('-', ' '));
};
export const Breadcrumbs = () => {
  const router = useRouter();

  let currentLink = '';

  const crumbs = router.pathname
    .split('/')
    .filter((crumb) => crumb !== '')
    .map((crumb) => {
      currentLink += `/${crumb}`;
      if (crumb !== '[slug]')
        return (
          <div className="crumb" key={crumb}>
            <Action as="link" styleType="link" href={currentLink}>
              {styleCrumb(crumb)}
            </Action>
          </div>
        );
    });

  crumbs.unshift(
    <div className="crumb" key="home">
      <Action as="link" styleType="link" href={'/'}>
        Home
      </Action>
    </div>,
  );
  return (
    <div>
      <div className="row breadcrumbs">{crumbs}</div>
    </div>
  );
};
