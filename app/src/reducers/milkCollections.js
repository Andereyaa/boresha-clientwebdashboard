import * as types from '../actions'
import {initialState} from './index'

//STATE
// milkCollections: {
//     milkCollectionsById: {},
//     milkCollectionIdsBySupplierId: {},
//     milkCollectionIds: [],
//     selectedId: null
// }

const milkCollectionsReducer = (state = initialState.milkCollections, action = {}) => {
    const {type, payload} = action;
    let milkCollectionsById = {...state.milkCollectionsById}
    let milkCollectionIdsBySupplierId = {...state.milkCollectionIdsBySupplierId}
    let deletedMilkCollectionIds = {...state.deletedMilkCollectionIds} 
    let updatedState

    switch (type) {

        case types.LOGOUT:
            return initialState.milkCollections;

        case types.SAVE_CENTER: {
            let newDeletedMilkCollectionIds = payload.center.deletedMilkCollections ? payload.center.deletedMilkCollections : {}
            deletedMilkCollectionIds = {...deletedMilkCollectionIds, ...newDeletedMilkCollectionIds}

            let milkCollections = payload.center.milkCollectionsToday ? Object.values(payload.center.milkCollectionsToday) : []
            
            updatedState = addListOfMilkCollectionsToState(
                milkCollections, 
                milkCollectionsById, 
                milkCollectionIdsBySupplierId,
                deletedMilkCollectionIds
            )
            return {
                ...state,
                milkCollectionIds: Object.keys(updatedState.milkCollectionsById),
                milkCollectionIdsBySupplierId: updatedState.milkCollectionIdsBySupplierId,
                milkCollectionsById: updatedState.milkCollectionsById,
                deletedMilkCollectionIds
            }
        }
        
        case types.SAVE_MILK_COLLECTIONS: {
            updatedState = addListOfMilkCollectionsToState(
                payload.milkCollections, 
                milkCollectionsById, 
                milkCollectionIdsBySupplierId,
                deletedMilkCollectionIds
            )
            return {
                ...state,
                milkCollectionIds: Object.keys(updatedState.milkCollectionsById),
                milkCollectionIdsBySupplierId: updatedState.milkCollectionIdsBySupplierId,
                milkCollectionsById: updatedState.milkCollectionsById,
                deletedMilkCollectionIds
            }
        }

        default:
            return state
    }
};

const addListOfMilkCollectionsToState = (
    milkCollectionList, 
    milkCollectionsById, 
    milkCollectionIdsBySupplierId,
    deletedMilkCollectionIds
) => {
    //save the list of milk records from the server into state
        
    milkCollectionList.forEach(milkCollectionData => {
        //save milk collection object in redux, overwriting anything previously there
        milkCollectionsById[milkCollectionData.id] = {
            ...milkCollectionsById[milkCollectionData.id],
            ...milkCollectionData
        }
        
        if (!milkCollectionIdsBySupplierId[milkCollectionData.supplierId]) {
            //if this is the first entry for this supplier create an array with the entry for this milk collection
            // under his id
            milkCollectionIdsBySupplierId[milkCollectionData.supplierId] = [milkCollectionData.id]
        } else { //if we already have an id for this supplier
            if (!milkCollectionIdsBySupplierId[milkCollectionData.supplierId].includes(milkCollectionData.id)){
                //if the suppliers list of milk records does not include the current one, add it to the list
                milkCollectionIdsBySupplierId[milkCollectionData.supplierId].push(milkCollectionData.id)
            }
        }

    });

    Object.keys(deletedMilkCollectionIds).forEach(deletedMilkCollectionId => {
        //loop through the deleted milk collection ids and remove each one
        const deletedMilkCollection = milkCollectionsById[deletedMilkCollectionId]
        if (deletedMilkCollection){
            milkCollectionIdsBySupplierId[deletedMilkCollection.supplierId] = milkCollectionIdsBySupplierId[deletedMilkCollection.supplierId].filter((supplierMilkCollectionId) => supplierMilkCollectionId !== deletedMilkCollectionId)
            delete milkCollectionsById[deletedMilkCollectionId]
        }
    })
    
    return {milkCollectionsById, milkCollectionIdsBySupplierId}
}

export default milkCollectionsReducer