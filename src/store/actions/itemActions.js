import { itemService } from "../../services/itemService"
// Action Dispatcher
export function loadItems(filterBy, pageNumber, isSort) {
  return async (dispatch) => {
    const Items = await itemService.query(filterBy, pageNumber, isSort);
    // console.log('Action Dispatche loadItems',Items)
    dispatch({ type: "SET_Items", Items });
  };
}

export function loadItemsCount() {
  return async (dispatch) => {
    const itemsCount = await itemService.queryCount();
    // console.log('Action Dispatche loadItemsCount',itemsCount)
    dispatch({ type: "SET_Items_Count", itemsCount });
  };
}

export function getById(ItemId) {
  return async (dispatch) => {
    const Item = await itemService.getById(ItemId);
    dispatch({ type: "SET_Item", Item });
    return Item
  };
}

export function removeItem(ItemId) {
  return async (dispatch) => {
    try {
      await itemService.remove(ItemId);
      dispatch({ type: "REMOVE_Item", ItemId: ItemId });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function addItem(Item) {
  return async (dispatch) => {
    try {
      console.log('addItem(Items)', Item)
      const savedItem = await itemService.save(Item);
      dispatch({ type: "ADD_Item", Item: Item });
      return savedItem
    } catch (err) {
      console.log("ERROR!", err);
    }
  };
}

export function editItem(Item) {
  console.log('editItem Item',Item)
  return async (dispatch) => {
    try {
      const updatedItem = await itemService.update(Item);
      dispatch({ type: "EDIT_ITEM", updatedItem });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setItem(Item) {
  return async (dispatch) => {
    try {
      dispatch({ type: "SET_Item", Item });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}

export function setItemByID(ItemId) {
  console.log('setItemByID', ItemId)
  return async (dispatch) => {
    console.log('setItemByID', ItemId)
    try {
      console.log('setItemByID', ItemId)
      const Item = await itemService.getById(ItemId);
      console.log('setItemByID', Item)
      // dispatch({ type: "SET_ITEM_BY_ID", ItemId });
      dispatch({ type: "SET_Item", Item });
    } catch (err) {
      console.log("ERROR!");
    }
  };
}



