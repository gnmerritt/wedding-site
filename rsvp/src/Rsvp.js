// @flow

import React from 'react';
// $FlowFixMe
import email from 'email-validator';
import type { Party } from './PartyTypeahead';
import Guest from './Guest';
import LogisticsComponent from './Logistics';

type Props = {|
  party: Party
|};

export type Meal = 'chicken' | 'veggie' | 'beef' | 'kids';

export type GuestStatus = {|
  attending: ?boolean,
  meal_choice: ?Meal,
  dietary_needs: string
|};

export type Logistics = {|
  email: string,
  camping: boolean,
  portland_seats: ?number,
  freeport_seats: ?number,
  note: string
|};

type RsvpStatus = {|
  status: Map<string, GuestStatus>,
  logistics: Logistics,
  submitting: boolean
|};

class Rsvp extends React.Component<Props, RsvpStatus> {
  state: RsvpStatus = {
    status: new Map(),
    logistics: {
      email: '',
      camping: false,
      portland_seats: null,
      freeport_seats: null,
      note: ''
    },
    submitting: false
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
    if (this.attendees() === 0) {
      return null;
    }
    const { logistics } = this.state;
    const change = f => {};
    return <LogisticsComponent logistics={logistics} onChange={change} />;
  }

  attendees() {
    let attending = 0;
    this.state.status.forEach((r, k) => (attending += r.attending ? 1 : 0));
    return attending;
  }

  canSubmit() {
    const { status, logistics } = this.state;
    for (const rsvp of status.values()) {
      if (rsvp.attending == null) return false;
      if (!rsvp.attending) continue;
      if (rsvp.meal_choice == null) return false;
    }
    if (this.attendees() > 0) {
      if (logistics.freeport_seats == null) return false;
      if (logistics.portland_seats == null) return false;
      if (!email.validate(logistics.email)) return false;
    }
    return true;
  }

  renderSubmit() {
    const { submitting } = this.state;
    const enabled = this.canSubmit() && !submitting;
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
