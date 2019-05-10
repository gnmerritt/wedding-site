// @flow

import React from 'react';
// $FlowFixMe
import cn from 'classnames';
import type { Member } from './PartyTypeahead';
import type { GuestStatus, Meal } from './Rsvp';
// eslint-disable-next-line no-unused-vars
import party from './images/party-60.png';

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
        <span className="guestName">{this.props.guest.name}</span>
        <span className="options">
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
        <span class="title">
          Calabrian Chili Cauliflower & Three Bean Salad
        </span>
        <span class="ingred">
          Calabrian Chili and lemon grilled Cauliflower / chilled fennel pollen
          and herb 3-bean salad / black pepper tahini sauce
        </span>
        <span class="ingred">Gluten-free, Vegan</span>
      </div>,
      <div
        key="c"
        className={cn('option', s('chicken'))}
        onClick={meal('chicken')}
      >
        <span class="title">Paprika Chicken Thigh & Fingerlings</span>
        <span class="ingred">
          Paprika rubbed chicken thigh / roasted shallot yogurt / crispy
          fingerling potatoes / confit garlic and grilled broccoli rabe
        </span>
        <span class="ingred">Gluten-free</span>
      </div>,
      <div key="b" className={cn('option', s('beef'))} onClick={meal('beef')}>
        <span class="title">Short Rib & Udon Noodles</span>
        <span class="ingred">
          Ginger soy boneless beef short rib / charred shishito pepper / coconut
          bok choy / udon noodles
        </span>
      </div>
    ];
    if (this.props.guest.child) {
      options.push(
        <div key="k" className={cn('option', s('kids'))} onClick={meal('kids')}>
          <span class="title">Kid's meal</span>
          <span class="ingred">
            Survey to follow with kid's meal options. All children are welcome
            to order a full entrée if they would prefer.
          </span>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>Dinner selection</div>
        <div className="guest-meals box">{options}</div>
      </React.Fragment>
    );
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
      <div class="dietary">
        <label>Dietary restrictions or allergies: </label>
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
