import {firestore} from '../firebase'
import {logError} from '../utils/errorHandling'

import {MONTH_IN_MILLISECONDS} from '../constants/time'

export const SAVE_MILK_COLLECTIONS = 'SAVE_MILK_COLLECTIONS'

export const saveMilkCollections = (milkCollections, centerId, periodId) => {
    return {
        type: SAVE_MILK_COLLECTIONS,
        payload: {
            milkCollections,
            centerId,
            periodId
        }
    }
}

export const fetchMilkCollections = (centerId, period = null) => {
    /**
     * Purpose: retrieve the milk records for this center from the firestore database
     */

    const startDate = period ? period.startDate : Date.now() - MONTH_IN_MILLISECONDS 
    const endDate= period ? period.endDate  : Date.now()
    const milkCollectionsRef = firestore.collection("milkCollections")

    return dispatch => milkCollectionsRef
        .where("centerId", "==", centerId)
        .where("dateCollected", ">=", startDate)
        .where("dateCollected", "<", endDate)
        .get()
        .then(querySnapshot => {
            //get an array of milkCollections from the snapshot
            const milkCollections = querySnapshot.docs.map(docRef => ({...docRef.data(), id: docRef.id}));
            const periodId = period ? period.id : null
            dispatch(saveMilkCollections(milkCollections, centerId, periodId))
            return true
        })
        .catch(error => {
            error.message = `Failed to fetch the milk records for centerId: ${centerId} with dateCollecteds between ${startDate} and ${endDate}: ${error.message}`
            logError(error)
            return false
        });
}