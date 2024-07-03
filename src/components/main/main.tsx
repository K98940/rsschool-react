import Card from '../card/card';
import classes from './main.module.css';
import { Component, ReactNode } from 'react';
import CardEmpty from '../cardEmpty/cardEmpty';
import { AnimalBase } from '@/types/types';

type MainProps = {
  data: AnimalBase[] | undefined;
};

export default class Main extends Component<MainProps> {
  render(): ReactNode {
    if (this.props.data?.length === 0)
      return (
        <main className={classes.main}>
          <CardEmpty />
        </main>
      );
    return <main className={classes.main}>{this.props.data?.map((animal, i) => <Card data={animal} key={i} />)}</main>;
  }
}
