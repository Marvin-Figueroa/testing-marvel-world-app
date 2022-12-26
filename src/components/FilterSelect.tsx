/* eslint-disable no-unused-vars */
import './FilterSelect.scss';

type Props = {
  label: string;
  value?: string;
  options: string[];
  onFilterChange: (option: string) => void;
};

function FilterSelect({ label, value, options, onFilterChange }: Props) {
  const newOptions = ['Select an option', ...options];

  return (
    <div className='filter-select'>
      <label className='filter-select__label' htmlFor={label}>
        Filter by {label}
      </label>
      <select
        id={label}
        className='filter-select__select'
        value={value}
        onChange={(e) => {
          onFilterChange(e.target.value);
        }}>
        {newOptions.map((option) => {
          return (
            <option value={option} key={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default FilterSelect;
