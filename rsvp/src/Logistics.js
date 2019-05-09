// @flow

import React from 'react';
import type { Logistics } from './Rsvp';

type Props = {
  logistics: Logistics,
  onChange: Logistics => void
};

function LogisticsComponent(props: Props) {
  const { email, freeport_seats, portland_seats, camping } = props.logistics;
  return (
    <div>
      <div>Other Logistics</div>
      <input type="email" value={email} placeholder="Please enter your email" />
      <input type="number" value={freeport_seats} />
      <input type="number" value={portland_seats} />
      <input type="checkbox" checked={camping} />
    </div>
  );
}

export default LogisticsComponent;
