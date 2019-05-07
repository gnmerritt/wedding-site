// @flow

import React from 'react';
import type { Party } from './PartyTypeahead';

type Props = {|
  party: Party,
|};

class Rsvp extends React.Component<Props> {
  render() {
    return (
      <div>RSVP for {this.props.party.name}!</div>
    );
  }
}

export default Rsvp;
