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


export function ItemEdit() {
    const dispatch = useDispatch();
    let params = useParams();
    const currItem = useSelector((state) => state.itemReducer.currItem);

    const [formData, setFormData] = useState({
        Title: '',
        Year: '',
        imdbID: null,
        Poster: null,
    })

    useEffect(() => {
        async function fetchData() {
            await dispatch(setItemByID(params.itemId))
          }
          fetchData()      
    }, []);

    useEffect(() => {
        if (currItem !== null) {
            setFormData((prevState) => ({
                Title: currItem.Title,
                Year: currItem.Year,
                imdbID: currItem.imdbID,
                Poster: currItem.Poster,
            }));
        }
        console.log('currItem', currItem)
        console.log('formData', formData)
    }, [currItem]);

    const handleAddItem = async (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        setFormData((prevState) => ({
            Title: '',
            Year: '',
        }));
    }

    const handleChange = async (event) => {
        event.preventDefault();
        const field = event.target.name;
        const value = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            [field]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log('handleSubmit currItem',currItem,'formData',formData)
        (currItem) ? await dispatch(editItem(formData)) : await dispatch(addItem(formData))
    }

    const FormEdit = () => {
        return (
            <div className="edit-container">
                <form>
                    <div className="item">
                        <input className='input' value={formData.Title} onChange={handleChange}
                            placeholder='Title' name='Title' type='text' />
                        <input className='input' value={formData.Year} onChange={handleChange}
                            placeholder='Year' name='Year' type='text' />
                        <button className='button' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div className="section-view-item">
            <Link to={`/`}> Main </Link> |{" "}
            <h2>Add / Edit List:</h2>
            <button className='button' onClick={handleAddItem}>Add New Item</button>
            {FormEdit()}

        </div>
    );
}
