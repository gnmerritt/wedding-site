// @flow

import React from 'react';

declare var DATA: { [string]: Array<string> };

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
  onSelect: (name: Party) => void
|};

function getMatches(query: string): Array<string> {
  if (!query || query.length < 2) {
    return [];
  }
  const matches = [];
  for (const key of Object.keys(DATA)) {
    if (key.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
      matches.push(key);
    }
  }
  return matches;
}

function getParty(name: string): Party {
  const members = DATA[name];
  return {
    name: name,
    members: members.map(n => ({
      name: n.replace(' kid', ''),
      child: n.indexOf('kid') !== -1
    }))
  };
}

function PartyTypeahead(props: Props) {
  if (!props.query) {
    return null;
  }
  const matches = getMatches(props.query);
  if (!matches) {
    return <div className="typeahead">No matches found, please try again</div>;
  }
  return (
    <div className="typeahead">
      {matches.map(name => (
        <div
          className="item"
          key={name}
          onClick={() => props.onSelect(getParty(name))}
        >
          {name}
        </div>
      ))}
    </div>
  );
}

export default PartyTypeahead;
