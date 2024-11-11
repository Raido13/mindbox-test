import { Dispatch, SetStateAction } from "react";
import { Filter } from "../filter/filter";
import s from './filters.module.scss';

const defaultFilters = [
  { value: 'All'},
  { value: 'Active'},
  { value: 'Completed'},
];

type TProps = {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
}

export const Filters = ({ activeFilter, setActiveFilter }: TProps) => {
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
