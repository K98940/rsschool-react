import Card from '../card/card';
import classes from './main.module.css';
import { EpisodeBase } from '@/types/types';
import { Component, ReactNode } from 'react';
import CardEmpty from '../cardEmpty/cardEmpty';

type MainProps = {
  data: EpisodeBase[] | undefined;
};

export default class Main extends Component<MainProps> {
  render(): ReactNode {
    if (this.props.data?.length === 0)
      return (
        <main className={classes.main}>
          <CardEmpty />
        </main>
      );
    return (
      <main className={classes.main}>{this.props.data?.map((episode, i) => <Card data={episode} key={i} />)}</main>
    );
  }
}
