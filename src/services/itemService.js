import HttpService from './HttpService'
import angular_Response from './db/angular_Response.json'
// const KEY = 'itemsDB';
let db = angular_Response.results
let total = angular_Response.totalResults
// console.log('angular_Response db', db)

export const itemService = {
    query,
    getById,
    remove,
    save,
    update,
    queryCount
}

function query(filterBy, pageNumber, isSort) {
    // console.log('query pageNumber', filterBy, pageNumber)
    try {
        let dbQueryFiltered = (filterBy.filter) ? filterQuery(filterBy) : db;
        total = dbQueryFiltered.length
        let dbQuerySorted = sortQuery(dbQueryFiltered, isSort, filterBy.term)
        // console.log('query dbQuerySorted', dbQuerySorted)
        let dbQueryPaginated = paginate(dbQuerySorted, 3, pageNumber)
        console.log('dbQueryPaginated ', dbQueryFiltered)
        return dbQueryPaginated
        // return HttpService.get(`item/${pageNumber}`);
    } catch {
        const err = 'error 500'
        return err
    }
}

function queryCount(pageNumber) {
    return total
    // return HttpService.get(`item/count`);
}

function getById(itemId) {
    const index = findById(itemId);
    return db[index]
    // return HttpService.get(`item/${itemId}`);
}

function remove(itemId) {
    console.log('remove', itemId)
    const index = findById(itemId);
    db.slice(index,1)
    // return HttpService.delete(`item/${itemId}`);
}

function save(item) {
    db.push(item)
    // return HttpService.post('item', item)
}

function update(item) {
    const index = findById(item.imdbID);
    db.splice(index,1,item)
    console.log('itemUpdated',item)
    return item
    // return HttpService.put(`item/${item._id}`, item);
}

const filterQuery = (filterBy) => {
    const term = filterBy.term
    const filter = filterBy.filter
    console.log('filterQuery', term, filter)
    const dbQueryFiltered = db.filter(item => {
        console.log('item[term]', item[term])
        return item[term] === filter || item[term].toLowerCase().includes(filter.toLowerCase())
    })
    return dbQueryFiltered;
}

const sortQuery = (dbQueryFiltered, isSort , filterBY) => {
    let sortedArray = dbQueryFiltered.sort((a, b) => {
        let nameA = a[filterBY].toUpperCase(); // ignore upper and lowercase
        let nameB = b[filterBY].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
            return isSort ? -1 : 1;
        }
        if (nameA > nameB) {
            return isSort ? 1 : -1;
        }
        // names must be equal
        return 0;
    })
    console.log('sortedArray', sortedArray)
    return sortedArray;

}

const paginate = (array, pageSize, pageNumber) => {
    // console.log('paginate pageNumber', pageNumber)
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

const findById = (itemId) => {
    const index = db.findIndex(item => item.imdbID === itemId)
    return index
}

const makeId = (length = 5) => {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}