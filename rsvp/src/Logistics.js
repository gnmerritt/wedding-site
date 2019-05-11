// @flow
/* eslint-disable jsx-a11y/accessible-emoji */

import React from 'react';
import type { Logistics } from './Rsvp';

type Props = {
  logistics: Logistics,
  attendees: number,
  onChange: Logistics => void
};

function LogisticsComponent(props: Props) {
  const change = (key, value) =>
    // $FlowFixMe  - sorry flow :(
    props.onChange({ ...props.logistics, [key]: value });
  const textChange = key => ({ target: { value } }: SyntheticInputEvent<>) =>
    change(key, value);
  const campingChange = ({ target: { checked } }: SyntheticInputEvent<>) =>
    change('camping', checked);
  const { email, freeport_seats, portland_seats, camping } = props.logistics;
  const max = props.attendees;
  return (
    <div className="logistics">
      <h3>Hooray! Please help us with some logistical details</h3>
      <div>
        <label>Your email: </label>
        <input
          type="email"
          value={email}
          placeholder="ada@lovelace.org"
          onChange={textChange('email')}
        />
      </div>

      <div>Will your party be riding the shuttle 🚌 to the farm?</div>
      <div>
        <label>Number of seats from Portland: </label>
        <input
          className="seats"
          type="number"
          value={portland_seats}
          onChange={textChange('portland_seats')}
          min={0}
          max={max}
        />
      </div>

      <div>
        <label>Number of seats from Freeport: </label>
        <input
          className="seats"
          type="number"
          value={freeport_seats}
          onChange={textChange('freeport_seats')}
          min={0}
          max={max}
        />
      </div>

      <div>Will your party be camping at the farm after the reception?</div>
      <div>
        <label>🌲⛺🏕️🌙: </label>
        <input
          className="camping"
          type="checkbox"
          checked={camping}
          onChange={campingChange}
        />
      </div>
    </div>
  );
}

export default LogisticsComponent;
