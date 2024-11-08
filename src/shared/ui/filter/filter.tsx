import s from './filter.module.scss';
import cn from 'classnames';

type TProps = {
  value: string;
  setCurrent: (value: string) => void;
  activeFilter: string;
}

export const Filter = ({value, setCurrent, activeFilter}: TProps) => {
  return (
    <li className={cn(s.filter, activeFilter && s.filter__active)} onClick={() => setCurrent(value)}>{value}</li>
  )
}
