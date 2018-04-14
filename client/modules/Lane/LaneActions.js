import uuid from 'uuid';
import callApi from '../../util/apiCaller'
import {lanes} from '../../util/schema';
import {normalize} from 'normalizr'
import {createNotes} from '../Note/NoteActions'
// Export Constants
export const CREATE_LANE = "CREATE_LANE";
export const UPDATE_LANE = "UPDATE_LANE";
export const DELETE_LANE = "DELETE_LANE";
export const CLREATE_LANES = 'CREATE_LANES';
export const EDIT_LANE = "EDIT_LANE";
export const CREATE_LANES = "CREATE_LANES"
// Export Actions
import omit from 'lodash/omit'

export function createLane(lane) {
    return {
        type: CREATE_LANE,
        lane: {
            notes: [],
            ...lane,
        }
    }
}

export function createLaneRequest(lane) {
    console.log('create lane requestr', lane)
    return dispatch => {
        return callApi('lanes', 'post', lane).then(res => {
            dispatch(createLane(res));
        })
    }
}

export function updateLane(lane) {
    return {
        type: UPDATE_LANE,
        lane
    }
}

export function updateLaneRequest(lane) {
    return dispatch => {
        return callApi('lanes/'+lane.id, 'put', {lane: omit(lane, 'notes')}).then(() => {
            dispatch(updateLane(lane));
        })
    }
}

export function deleteLane(laneId) {
    return {
        type:DELETE_LANE,
        laneId
    }
}
export function deleteLaneRequest(laneId) {
    return dispatch => {
        return callApi('lanes/'+laneId, 'delete').then(() => {
            dispatch(deleteLane(laneId));
        })
    }
}
export function createLanes(lanesData) {
    return {
        type: CREATE_LANES,
        lanes: lanesData
    }
}

export function fetchLanes() {
    console.log('fetch lanes fired')
    return (dispatch) => {
        return callApi('lanes').then(res => {
            console.log('response!', res)
            const normalized = normalize(res.lanes, lanes);
            const {lanes: normalizedLanes, notes} = normalized.entities
            console.log('NORMALIZED LaNES', normalizedLanes)
            console.log('NORMALIZED NOTES', notes)
            dispatch(createNotes(notes));
            dispatch(createLanes(normalizedLanes));
        })
    }
}
export function editLane(laneId) {
    return {
        type:EDIT_LANE,
        laneId
    }
}