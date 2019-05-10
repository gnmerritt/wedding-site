// @flow

import React from 'react';
// $FlowFixMe
import email from 'email-validator';
// $FlowFixMe
import cn from 'classnames';
import type { Party } from './PartyTypeahead';
import Guest from './Guest';
import LogisticsComponent from './Logistics';
// eslint-disable-next-line no-unused-vars
import button from './button.css';

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
  portland_seats: number,
  freeport_seats: number,
  note: string
|};

type RsvpStatus = {|
  status: Map<string, GuestStatus>,
  logistics: Logistics,
  submitting: boolean,
  showHint: boolean
|};

class Rsvp extends React.Component<Props, RsvpStatus> {
  state: RsvpStatus = {
    status: new Map(),
    logistics: {
      email: '',
      camping: false,
      portland_seats: 0,
      freeport_seats: 0,
      note: ''
    },
    submitting: false,
    showHint: false
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

  renderGuests() {
    return (
      <div className="members">
        {this.props.party.members.map(g => (
          <Guest
            key={g.name}
            guest={g}
            status={this.getStatus(g.name)}
            onChange={update =>
              this.setState(({ status }) => ({
                status: status.set(g.name, update),
                showHint: false
              }))
            }
          />
        ))}
      </div>
    );
  }

  renderLogistics() {
    const attendees = this.attendees();
    if (attendees === 0) {
      return null;
    }
    const change = update =>
      this.setState(() => ({ logistics: update, showHint: false }));
    const { logistics } = this.state;
    return (
      <LogisticsComponent
        logistics={logistics}
        onChange={change}
        attendees={attendees}
      />
    );
  }

  attendees() {
    let attending = 0;
    this.state.status.forEach((r, k) => (attending += r.attending ? 1 : 0));
    return attending;
  }

  canSubmit() {
    const { status, logistics } = this.state;
    for (const guest of status.keys()) {
      const rsvp = this.getStatus(guest);
      if (rsvp.attending == null) return `Is ${guest} attending?`;
      if (!rsvp.attending) continue;
      if (rsvp.meal_choice == null)
        return `What would ${guest} like for dinner?`;
    }
    if (this.attendees() > 0) {
      if (!email.validate(logistics.email))
        return 'Please share your email with us';
    }
    return null;
  }

  doSubmit() {
    this.setState(() => ({ submitting: true }));
    console.log('TODO: submitting');
  }

  renderSubmit() {
    const { submitting } = this.state;
    const hint = this.canSubmit();
    const disabled = hint != null || submitting;
    const showHint = this.state.showHint && hint != null;
    const clickHandler = disabled
      ? () => this.setState(() => ({ showHint: true }))
      : () => this.doSubmit();
    return (
      <div className="submit">
        {showHint ? <div className="hint">{hint}</div> : null}
        <button
          type="button"
          className={cn('submitButton', { disabled })}
          onClick={clickHandler}
        >
          {submitting ? 'Sending...' : 'Send to Katherine & Nathan'}
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="rsvp">
        <h3 className="party-name">
          Party of <span className="guestName">{this.props.party.name}</span>
        </h3>
        {this.renderGuests()}
        {this.renderLogistics()}
        {this.renderSubmit()}
      </div>
    );
  }
}

export default Rsvp;
