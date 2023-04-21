const initialState = {
    cards: [],
    list: []
}

export default function reducer(state = initialState, action) {

    switch (action.type) {

        case "ADD_CARD":

            const cardList = [...state.cards];
            const founded = cardList.find(item => item.id === action.payload.id);

            if (founded) return state;
            cardList.push(action.payload)

            return {
                ...state,
                cards: cardList
            };


        case "DELETE_CARD":

            const deleteList = [...state.cards];
            const existed = deleteList.find(item => item.id === action.payload.id);

            if (existed) return {
                ...state,
                cards: deleteList.filter(item => item !== existed)
            }

            return state;


        case "CLEAR_CARD":

            return {
                ...state,
                cards: []
            }

        case "ADD_LIST":

            const listArr = [...state.list];
            const found = listArr.find(item => item.name === action.payload.name);

            if (found) return state;
            listArr.push(action.payload)

            return {
                ...state,
                list: listArr
            };


        case "DELETE_ITEM_FROM_LIST":

            const list = [...state.list];

            let exactList = list.find(item => item.name === action.payload.name);

            exactList = {
                ...exactList,
                favList: exactList.favList.filter(item => item.id !== action.payload.id)
            };

            if (exactList.favList.length === 0) {

                const removedItemList = list.filter(item => item.name !== exactList.name);

                return {
                    ...state,
                    list: removedItemList
                }

            } else {

                const readyList = list.map(item => {
                    if (item.name === exactList.name) {
                        return item = exactList
                    } else {
                        return item
                    }
                });

                return {
                    ...state,
                    list: readyList
                }
            }

        case "DELETE_LIST":

            const deletedList = [...state.list];

            const refreshedList = deletedList.filter(item => item.name !== action.payload.name);

            return {
                ...state,
                list:refreshedList
            }

        default:
            return state;
    }

}
