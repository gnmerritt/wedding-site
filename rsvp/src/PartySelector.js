// @flow

import React, { PureComponent } from 'react';

import PartyTypeahead from './PartyTypeahead';
import type { Party } from './PartyTypeahead';
import Rsvp from './Rsvp';

type State = {|
  query: string,
  selected: ?Party,
|};

class PartySelector extends PureComponent<any, State> {
  state: State = {
    query: '',
    selected: null,
  }

  onChangeText = ({ target: { value } }: SyntheticInputEvent<HTMLInputElement>) => this.setState(() => ({ query: value }));
  onSelectParty = ( party: Party ) => this.setState(() => ({ selected: party }));

  render() {
    const { query, selected } = this.state;
    if (selected) {
      return <Rsvp party={selected} />
    }
    return (
      <div>
        <input onChange={this.onChangeText} value={query} type="text" placeholder="Please type your name here" />
        <PartyTypeahead query={query} onSelect={this.onSelectParty} />
      </div>
    );
  }
}

export default PartySelector;
