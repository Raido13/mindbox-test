import s from './filter.module.scss';
import cn from 'classnames';

type TProps = {
  value: string;
  setCurrent: (value: string) => void;
  activeFilter: string;
}

export const Filter = ({ value, setCurrent, activeFilter }: TProps) => {
  return (
    <li data-testid={`filter-${value}`} className={cn(s.filter, activeFilter === value && s.filter__active)} onClick={() => setCurrent(value)}>{value}</li>
  )
}
