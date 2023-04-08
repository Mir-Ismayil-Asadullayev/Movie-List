const initialState = {
    cards: []
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

        default:
            return state;
    }

}
