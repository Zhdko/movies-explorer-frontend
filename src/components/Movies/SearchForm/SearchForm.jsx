import { useEffect, useState } from 'react';
import useValidation from '../../../hooks/useValidation';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  const { values, errors, handleChange, isValid } = useValidation();
  const [isChecked, setIsChecked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    props.handleSearch(values.search || '', isChecked);
  }

  function handleChangeCheckbox(e) {
    const isShortFilms = e.target.checked;
    setIsChecked(isShortFilms);
    props.handleSearch(values.search, isShortFilms);
  }

  // useEffect(() => {
  //   setIsChecked(localStorage.getItem('isShortFilms') || false);
  // }, [setIsChecked]);
  return (
    <section className='movies__search-form'>
      <form name='search-form' className='search-form' onSubmit={handleSubmit}>
        <input
          id='search'
          type='text'
          name='search'
          className='search-form__input'
          placeholder='Фильм'
          required=''
          minLength={0}
          value={values.search || ''}
          onChange={handleChange}
          errors={errors.search || ''}
        />
        <button className='search-form__submit-btn' type='submit'>
          Поиск
        </button>
      </form>
      <FilterCheckbox checked={isChecked} onChange={handleChangeCheckbox} />
      <div className='search-form__line'></div>
    </section>
  );
}

export default SearchForm;
