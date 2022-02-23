import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    loadItems,
    getById,
    setItem,
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
} from '../store/actions/itemActions';

export function Filter({ onSetFilter, onChangeView, view }) {
    const dispatch = useDispatch();

    const handleFilter = async (event) => {
        const filter = event.target.value
        console.log('filter', filter)
        onSetFilter({ term: 'Type', filter: filter })

    }

    const changeView = async (event) => {
        onChangeView()
    }

    return (
        <div className="items-filter">
            <h2>Filter Items</h2>
            <button className='button' value='movie' onClick={handleFilter}>Movies</button>
            <button className='button' value='series' onClick={handleFilter}>Series</button>
            <button className='button' value='game' onClick={handleFilter}>Games</button>
            <button className='button button-view' value={view} onClick={changeView}>Change View to {view ? 'Grid' : 'list '}</button>
        </div>
    );
}
