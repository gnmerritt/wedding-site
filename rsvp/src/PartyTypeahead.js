// @flow

import React from 'react';

export type Member = {|
  name: string,
  child: boolean
|};

export type Party = {|
  name: string,
  members: Array<Member>
|};

type Props = {|
  query: string,
  data: ?{ [string]: Array<string> },
  onSelect: (name: Party) => void
|};

function getMatches(data, query: string): Array<string> {
  if (!query || query.length < 2) {
    return [];
  }
  const matches = new Set();
  const words = query.toLowerCase().split(' ');
  for (const qw of words) {
    for (const key of Object.keys(data)) {
      if (key.toLowerCase().indexOf(qw) !== -1) {
        matches.add(key);
      }
    }
  }
  return Array.from(matches);
}

function getParty(data, name: string): Party {
  const members = data[name];
  return {
    name: name,
    members: members.map(n => ({
      name: n.replace(' kid', ''),
      child: n.indexOf('kid') !== -1
    }))
  };
}

function PartyTypeahead(props: Props) {
  const { query, data } = props;
  if (!query || !data) {
    return null;
  }
  const matches = getMatches(data, query);
  if (matches.length === 0) {
    return <div className="typeahead">No matches found, please try again</div>;
  }
  return (
    <div className="typeahead">
      <h4>Please select your party</h4>
      {matches.map(name => (
        <div
          className="item"
          key={name}
          onClick={() => props.onSelect(getParty(data, name))}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

export default PartyTypeahead;
