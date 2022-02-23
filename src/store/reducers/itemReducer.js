const INITIAL_STATE = {
  Items: JSON.parse(localStorage.getItem("lastItems")) || [],
  currItem: null,
  ItemsCount:null
};

export function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GET_Items":
      return {
        ...state,
        Items: state.Items,
      };
    case "SET_Items":
      // console.log("SET_Items",action.Items)
      return {
        ...state,
        Items: action.Items,
      };
    case "SET_ITEM_BY_ID":
      return {
        ...state,
        currItem: state.Items.filter((Item) => Item.imdbID === action.ItemId),  
      };
    case "SET_Item":
      return {
        ...state,
        currItem: action.Item,
      };
    case "REMOVE_Item":
      return {
        ...state,
        Items: state.Items.filter((Item) => Item.imdbID !== action.ItemId),
      };
    case "ADD_Item":
      return {
        ...state,
        Items: [...state.Items, action.Item],
      };
    case "EDIT_ITEM":
      console.log('EDIT_ITEM',action.updatedItem)
      return {
        ...state,
        Items: state.Items.map((Item) =>
          Item.imdbID === action.updatedItem.imdbID ? action.updatedItem : Item
        ),
      };
    case "SET_Items_Count":
      return {
        ...state,
        ItemsCount: action.itemsCount,
      };
    default:
      return state;
  }
}
