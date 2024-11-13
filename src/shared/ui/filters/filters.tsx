import { Dispatch, SetStateAction } from "react";
import s from './filters.module.scss';
import { Filters as FiltersEnum } from "@shared/enums/filters";
import cn from 'classnames';

const defaultFilters = [
  { value: FiltersEnum.All },
  { value: FiltersEnum.Active },
  { value: FiltersEnum.Completed },
];

type FiltersProps = {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}

export const Filters = ({ activeFilter, setActiveFilter }: FiltersProps) => {
  const setCurrentFilter = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <ul className={s.filters}>
      {defaultFilters.map((f, i) => 
        <Filter value={f.value} setCurrent={setCurrentFilter} activeFilter={activeFilter} key={i} />
      )}
    </ul>
  )
}

type FilterProps = {
  value: FiltersEnum;
  setCurrent: (value: string) => void;
  activeFilter: string;
}

const Filter = ({ value, setCurrent, activeFilter }: FilterProps) => {
  return (
    <li data-testid={`filter-${value}`} className={cn(s.filter, activeFilter === value && s.filter__active)} onClick={() => setCurrent(value)}>{value}</li>
  )
}
