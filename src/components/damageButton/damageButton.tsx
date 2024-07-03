import { Component, ReactNode } from 'react';
import classes from './damageButton.module.css';

type DamageButtonProps = {
  text: string;
};

export default class DamageButton extends Component<DamageButtonProps> {
  state = {
    hasError: false,
  };

  handleClick = (): void => {
    this.setState({ ...this.state, hasError: !this.state.hasError });
  };

  render(): ReactNode {
    if (this.state.hasError) throw new Error('do damage');
    return (
      <button className={classes.btnDoDamage} onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}
