// @flow

import React from 'react';
import type { Party } from './PartyTypeahead';
import Guest from './Guest';

type Props = {|
  party: Party
|};

export type Meal = 'chicken' | 'veggie' | 'beef' | 'kids';

export type GuestStatus = {|
  attending: ?boolean,
  meal_choice: ?Meal,
  dietary_needs: string
|};

type RsvpStatus = {|
  status: Map<string, GuestStatus>
|};

/*
type Response = {|
  attending: ?boolean,
  email: ?string,
  camping: ?boolean,
  meal_choice: ?Meal,
  dietary_needs: ?string,
  portland_seats: ?string,
  freeport_seats: ?string
|};
*/

class Rsvp extends React.Component<Props, RsvpStatus> {
  state: RsvpStatus = {
    status: new Map()
  };

  getStatus(name: string): GuestStatus {
    const { status } = this.state;
    let guestStatus = status.get(name);
    if (!guestStatus) {
      guestStatus = {
        attending: null,
        meal_choice: null,
        dietary_needs: ''
      };
      status.set(name, guestStatus);
    }
    return guestStatus;
  }

  renderExtras() {
    return <div className="rsvp-extras" />;
  }

  canSubmit() {
    const { status } = this.state;
    for (const rsvp of status.values()) {
      if (rsvp.attending == null) return false;
      if (!rsvp.attending) continue;
      if (rsvp.meal_choice == null) return false;
    }
    return true;
  }

  renderSubmit() {
    const enabled = this.canSubmit();
    return (
      <div>
        <input
          disabled={!enabled}
          type="submit"
          value="Send to Katherine & Nathan"
        />
      </div>
    );
  }

  render() {
    return (
      <div className="rsvp">
        <div>Responding for {this.props.party.name}</div>
        <div className="members">
          {this.props.party.members.map(g => (
            <Guest
              key={g.name}
              guest={g}
              status={this.getStatus(g.name)}
              onChange={update =>
                this.setState(({ status }) => ({
                  status: status.set(g.name, update)
                }))
              }
            />
          ))}
        </div>
        {this.renderExtras()}
        {this.renderSubmit()}
      </div>
    );
  }
}

export default Rsvp;
