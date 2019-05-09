// @flow

import React from 'react';
// $FlowFixMe
import cn from 'classnames';
import type { Member } from './PartyTypeahead';
import type { GuestStatus, Meal } from './Rsvp';

type Props = {|
  guest: Member,
  status: GuestStatus,
  onChange: GuestStatus => void
|};

class Guest extends React.Component<Props> {
  renderAttending() {
    const rsvp = attending => () => {
      const { status } = this.props;
      status.attending = attending;
      this.props.onChange(status);
    };
    const { attending } = this.props.status;
    return (
      <div className="attending">
        <div className="name">{this.props.guest.name}</div>
        <span
          className={cn('option', 'yes', { selected: attending === true })}
          onClick={rsvp(true)}
        >
          Accepts
        </span>
        <span
          className={cn('option', 'no', { selected: attending === false })}
          onClick={rsvp(false)}
        >
          Regretfully declines
        </span>
      </div>
    );
  }

  renderMeal() {
    const meal = (choice: Meal) => () => {
      const { status } = this.props;
      status.meal_choice = choice;
      this.props.onChange(status);
    };
    const s = opt => ({ selected: opt === this.props.status.meal_choice });
    const options = [
      <div
        key="v"
        className={cn('option', s('veggie'))}
        onClick={meal('veggie')}
      >
        Veggie
      </div>,
      <div
        key="c"
        className={cn('option', s('chicken'))}
        onClick={meal('chicken')}
      >
        Chicken
      </div>,
      <div key="b" className={cn('option', s('beef'))} onClick={meal('beef')}>
        Beef
      </div>
    ];
    if (this.props.guest.child) {
      options.push(
        <div key="k" className={cn('option', s('kids'))} onClick={meal('kids')}>
          Kid's meal
        </div>
      );
    }
    return <div className="guest-meals">{options}</div>;
  }

  renderDietary() {
    const update = ({
      target: { value }
    }: SyntheticInputEvent<HTMLInputElement>) => {
      const { status } = this.props;
      status.dietary_needs = value;
      this.props.onChange(status);
    };
    const { dietary_needs } = this.props.status;
    return (
      <div>
        <div>Dietary restrictions</div>
        <input type="text" value={dietary_needs} onChange={update} />
      </div>
    );
  }

  render() {
    const { attending } = this.props.status;
    return (
      <div className="guest">
        {this.renderAttending()}
        {attending ? this.renderMeal() : null}
        {attending ? this.renderDietary() : null}
      </div>
    );
  }
}

export default Guest;
