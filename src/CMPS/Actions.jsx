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

export function Actions({ filterBy, handleChangeSearch, onSetFilterTerm, handleChangeSort }) {
    const dispatch = useDispatch();

    return (
        <div className="actions">
            <h2>Actions:</h2>
            <input className='input' value={filterBy.filter} onChange={handleChangeSearch} placeholder='search' />
            {console.log('filterBy.term',filterBy.term)}
            <select onChange={onSetFilterTerm} value={filterBy.term}>
                <option value="Title">Title</option>
                <option value="Year">Year</option>
                <option value="Year">Type</option>
            </select>
            <button className='button' value=' ' onClick={handleChangeSearch}>Clear</button>
            <button className='button' value=' ' onClick={handleChangeSort}>Sort</button>
        </div>
    );
}
