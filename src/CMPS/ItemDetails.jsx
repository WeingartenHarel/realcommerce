import React, { useState, useEffect } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {
    loadItems,
    getById,
    setItem,
    setItemByID,
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
} from '../store/actions/itemActions';
import { useParams } from "react-router-dom";

export function ItemDetails() {
    const dispatch = useDispatch();
    let params = useParams();
    const currItem = useSelector((state) => state.itemReducer.currItem);

    useEffect(() => {
        async function fetchData() {
            await dispatch(setItemByID(params.itemId))
          }
          fetchData()      
    }, []);

    const FormView = () => {
        return (
            <div className="edit-container">
                    <div className="item">
                        <img className="img" src={currItem.Poster} alt="img"/>
                        <span>{currItem.Title}</span>
                        <span>{currItem.Year}</span>
                        <span>{currItem.Type}</span>    
                    </div>
            </div>
        )
    }

    return (
        <div className="section-view-item">
            <Link className="link" to={`/`}> {'<'} Main </Link>
            <h2>Item Details</h2>
            {currItem && FormView()}

        </div>
    );
}
