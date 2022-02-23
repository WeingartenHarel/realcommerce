import logo from './logo.svg';
import './App.scss';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadItems,
  getById,
  removeItem,
  addItem,
  editItem,
  loadItemsCount
} from './store/actions/itemActions';
import { ItemList } from './CMPS/ItemList';
import { ItemDetails } from './CMPS/ItemDetails'
import { Filter } from './CMPS/Filter';
import { Actions } from './CMPS/Actions';

function App() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.itemReducer.Items);
  const itemsCount = useSelector((state) => state.itemReducer.ItemsCount);
  const [pageNumber, setPage] = useState(1)
  const pageSize = 3;
  const paginationCount = itemsCount / pageSize;
  const [filterBy, setFilterBy] = useState({ term: 'Title', filter: '' })
  const [view, setView] = useState(false)
  const [isSort, setSort] = useState(true)

  useEffect(() => {
    async function fetchData() {
      await dispatch(loadItemsCount());
      await dispatch(loadItems(filterBy, pageNumber, isSort));
    }
    fetchData()
    console.log(filterBy, pageNumber, isSort)
  }, [filterBy, pageNumber, isSort]);

  // useEffect(() => {
  // }, []);

  const setFilter = (value) => {
    setFilterBy(value)
  }

  const handleChangeSearch = (event) => {
    setFilterBy((prevState) => ({
      ...prevState,
      filter: event.target.value
    }));
  }

  const onSetFilterTerm = (event) => {
    setFilterBy((prevState) => ({
      ...prevState,
      term: event.target.value
    }));
  }

  const changeView = (value) => {
    setView(!view)
  }

  const handleChangeSort = (value) => {
    setSort(!isSort)
  }

  const handleNextPage = () => {
    if (pageNumber < paginationCount) setPage(pageNumber + 1)
  }
  const handlePrevPage = () => {
    if (pageNumber > 1) setPage(pageNumber - 1)
  }

  return (

    <div className="App">
      <div className='section'>
        <div className='sidebar'>
          <img src={logo} className="App-logo" alt="logo" />
          <Filter onSetFilter={setFilter} onChangeView={changeView} view={view} />
        </div>
        <div className='main-container'>
          <div className="main-list">
            <Actions filterBy={filterBy} handleChangeSearch={handleChangeSearch}
              onSetFilterTerm={onSetFilterTerm} handleChangeSort={handleChangeSort} />
            {items && <ItemList items={items} view={view} />}
            <div className="actions">
              <button className='button' onClick={handlePrevPage}>Prev Page</button>
              <button className='button' onClick={handleNextPage}>Next Page</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
