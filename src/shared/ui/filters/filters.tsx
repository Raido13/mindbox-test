import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import s from './filters.module.scss';
import { Filters as FiltersEnum } from '@shared/enums/filters';
import cn from 'classnames';

const defaultFilters = [
  { value: FiltersEnum.All },
  { value: FiltersEnum.Active },
  { value: FiltersEnum.Completed },
];

type FiltersProps = {
  activeFilter: string;
  setActiveFilter: Dispatch<SetStateAction<string>>;
};

export const Filters = ({ activeFilter, setActiveFilter }: FiltersProps) => {
  const setCurrentFilter = useCallback(
    (filter: string) => {
      setActiveFilter(filter);
    },
    [setActiveFilter]
  );

  const filtersList = useMemo(
    () =>
      defaultFilters.map((f, i) => (
        <Filter
          value={f.value}
          setCurrent={setCurrentFilter}
          activeFilter={activeFilter}
          key={i}
        />
      )),
    [setActiveFilter, activeFilter]
  );

  return <ul className={s.filters}>{filtersList}</ul>;
};

type FilterProps = {
  value: FiltersEnum;
  setCurrent: (value: string) => void;
  activeFilter: string;
};

const Filter = React.memo(
  ({ value, setCurrent, activeFilter }: FilterProps) => {
    return (
      <li
        data-testid={`filter-${value}`}
        className={cn(s.filter, activeFilter === value && s.filter__active)}
        onClick={() => setCurrent(value)}
      >
        {value}
      </li>
    );
  }
);

Filter.displayName = 'Filter';
