import { useState } from "react";
import { Filter } from "../filter/filter";
import s from './filters.module.scss';

const defaultFilters = [
  { value: 'All'},
  { value: 'Active'},
  { value: 'Completed'},
]

export const Filters = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const setCurrentFilter = (filter: string) => {
    setActiveFilter(filter)
  }

  return (
    <ul className={s.fiters}>
      {defaultFilters.map(f => 
        <Filter value={f.value} setCurrent={setCurrentFilter} activeFilter={activeFilter} />
      )}
    </ul>
  )
}
