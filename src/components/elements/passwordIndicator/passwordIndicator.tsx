import classes from './passwordIndicator.module.css';
import {
  isNumberExist,
  isSpecialExist,
  isLowercaseExist,
  isUppercaseExist,
} from '@/utils/predicates';

type PasswordIndicatorProps = {
  password: string;
};

const rulles = [
  isNumberExist,
  isSpecialExist,
  isLowercaseExist,
  isUppercaseExist,
];

function renderIndicator(strength: number) {
  const indicator = [];
  for (let i = 0; i < strength; i += 1) {
    indicator.push(
      <li
        key={i}
        data-strength={strength}
        className={classes.indicatorElement}
        data-testid="indicator-element"
      ></li>,
    );
  }
  return indicator;
}

export function PasswordIndicator({ password }: PasswordIndicatorProps) {
  const passStrength = rulles.reduce(
    (strength, rulle) => (rulle(password) ? strength + 1 : strength),
    0,
  );

  return (
    <div className={classes.indicator} data-testid="pass-indicator">
      <ul className={classes.elementsContainer}>
        {renderIndicator(passStrength)}
      </ul>
    </div>
  );
}
