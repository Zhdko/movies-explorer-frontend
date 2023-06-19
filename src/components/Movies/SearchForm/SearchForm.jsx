import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm(props) {
  return (
    <section className='movies__search-form'>
      <form name='search-form' className='search-form'>
        <input
          id='search-film'
          type='text'
          name='film'
          className='search-form__input'
          placeholder='Фильм'
          required=''
        />
        <button className='search-form__submit-btn'>Поиск</button>
      </form>
      <FilterCheckbox />
      <div className='search-form__line'></div>
    </section>
  );
}

export default SearchForm;
