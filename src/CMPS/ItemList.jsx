import React, { useState, useEffect, useRef } from 'react';
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
    removeItem,
    addItem,
    editItem,
    loadItemsCount,
} from '../store/actions/itemActions';
import { ItemPreview } from './ItemPreview';



export function ItemList({ items, view }) {
    const dispatch = useDispatch();
    const currItem = useSelector((state) => state.itemReducer.currItem);
    const elementRef = useRef();

    const [formData, setFormData] = useState({
        Title: '',
        Year: '',
        imdbID: null,
        Poster: null,
    })
    const [isReadOnly, setIsReadOnly] = useState(false)

    useEffect(() => {
        // console.log('currItem', formData)
    }, [formData]);

    useEffect(() => {
        if (currItem !== null) {
            setFormData((prevState) => ({
                Title: currItem.Title,
                Year: currItem.Year,
                imdbID: currItem.imdbID,
                Poster: currItem.Poster,
            }));
        }
        // console.log('currItem',currItem)
    }, [currItem]);

    const handleDelete = async (event) => {
        event.preventDefault();
        let id = event.target.value
        await dispatch(removeItem(id));
    }


    const handleEdit = async (value) => {
        // event.preventDefault();
        let itemId = value;
        let itemIndex = items.findIndex(item => item.imdbID === itemId)
        let item = { ...items[itemIndex] }
        await dispatch(setItem(item));

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

    const itemTitle = async (value) => {
        let title = value;
        console.log('itemTitle', title)
        return title
    }

    const handleSubmit = async (event) => {
        await dispatch(editItem(formData));
        await dispatch(setItem(null));
    }

    const List = () => {
        return (
            items.map(item => {
                return (<div className={"item-container"} key={item.imdbID}>
                    {/* {console.log('item', item)} */}
                    <ItemPreview item={item} currItem={currItem} 
                    formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}
                    handleEdit={handleEdit} handleDelete={handleDelete}
                    />
                </div >)
            })
        )
    }

    return (
        <div className="items-section">
            <h2>Movie List:</h2>
            <div className={view ? "items-container" : "items-container grid"}>
                {List()}
            </div>
        </div>
    );
}
