import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
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
import defaultImage from '../assets/default.jpg'


export function ItemPreview({item,currItem,formData,handleChange,handleSubmit,handleEdit,handleDelete}) {
    let navigate = useNavigate();

    const date = (date)=>{
        let dateView = date.split("")
        console.log('dateView',dateView)
        let year = dateView.slice(0,4).join("");
        let month = dateView.slice(4,6).join("");
        let day = dateView.slice(6,8).join("");
        let result = day +'/'+month+'/'+year
        console.log('year',year,month,day)
        return result
    }
    
    return (
        <div className="item">
            <Link to={`/item-details/${item.imdbID}`}>
                <img src={item.Poster !== 'N/A' ? item.Poster : defaultImage} className='item-img' alt='poster' />
            </Link>
            <form>
                <div className='item-details'>
                    {/* onFocus={onFocus}  */}
                    {(currItem && item.imdbID === currItem.imdbID) ?
                        <input className='input-edit-title'
                            value={formData.Title} placeholder='Title' name='Title'
                            type='text' onChange={handleChange}
                            onBlur={handleSubmit} /> : ''}
                    {(!currItem || item.imdbID !== currItem.imdbID) ?
                        <span onClick={() => handleEdit(item.imdbID)}>{item.Title}</span> : ''}
                    <span>{date(item.Year)}</span>
                    <span>{item.Type}</span>
                </div>
            </form>
            <div className='item-actions'>
                <button className='button' value={item.imdbID} onClick={handleDelete}>Delete</button>
                <button className='button' value={item.imdbID} onClick={() =>  navigate(`/item-edit/${item.imdbID}`)}>Edit</button>
            </div>

        </div>
    );
}
