// @flow

import React, { PureComponent } from 'react';
// $FlowFixMe
import fetchJsonp from 'fetch-jsonp';

import PartyTypeahead from './PartyTypeahead';
import type { Party } from './PartyTypeahead';
import Rsvp, { URL_BASE } from './Rsvp';

type State = {|
  query: string,
  selected: ?Party,
  data: ?{ [string]: Array<string> }
|};

class PartySelector extends PureComponent<any, State> {
  state: State = {
    query: '',
    selected: null,
    data: null
  };

  onChangeText = ({
    target: { value }
  }: SyntheticInputEvent<HTMLInputElement>) =>
    this.setState(() => ({ query: value }));
  onSelectParty = (party: Party) => this.setState(() => ({ selected: party }));

  componentDidMount() {
    fetchJsonp(URL_BASE)
      .then(r => r.json())
      .then(data => this.setState(() => ({ data })));
  }

  render() {
    const { query, selected, data } = this.state;
    if (selected) {
      return (
        <div>
          <hr />
          <Rsvp party={selected} />
        </div>
      );
    }
    const placeholder = data
      ? 'Please type your name here to rsvp...'
      : 'Loading...';
    return (
      <div className="party-selector">
        <input
          className="ps-in"
          onChange={this.onChangeText}
          value={query}
          type="text"
          placeholder={placeholder}
        />
        <PartyTypeahead
          data={data}
          query={query}
          onSelect={this.onSelectParty}
        />
      </div>
    );
  }
}

export default PartySelector;
