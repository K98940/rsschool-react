import { useState } from 'react';
import classes from './damageButton.module.css';

type DamageButtonProps = {
  text: string;
};

export default function DamageButton({ text }: DamageButtonProps) {
  const [error, setError] = useState(false);
  const handleClick = () => setError(!error);

  if (error) throw new Error('do damage');
  return (
    <button className={classes.btnDoDamage} onClick={handleClick}>
      {text}
    </button>
  );
}
