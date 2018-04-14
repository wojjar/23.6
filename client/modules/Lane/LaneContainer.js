import {connect} from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import {createNote} from '../Note/NoteActions';
import callApi from '../../util/apiCaller'
import {deleteLaneRequest, updateLaneRequest, editLane} from './LaneActions';
import {createNoteRequest} from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => {
    console.log('own pprops', ownProps)
    return {
        laneNotes: ownProps.lane.notes.map(noteId => state.notes[noteId])
    };
}
const mapDispatchToProps = {
    editLane,
    deleteLane: deleteLaneRequest,
    updateLane: updateLaneRequest,
    addNote: createNoteRequest
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Lane)