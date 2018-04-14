import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Lanes from '../Lane/Lanes';
import styles from '../Lane/Lane.css';
import { createLaneRequest, fetchLanes } from '../Lane/LaneActions';
import { createNoteRequest } from '../Note/NoteActions';


const Kanban = (props) => {
  return (
    <div>
      <Lanes lanes={props.lanes} />
      <button

        onClick={() => props.createLane({
          name: 'New lane'
        })}
      >Add Lane</button>
    </div>
  )
}

// Kanban.need = [() => {return fetchLanes()}];

const mapStateToProps = (state) => ({
  lanes: Object.values(state.lanes)
});

const mapDispatchToProps = {

  createLane: createLaneRequest,
  addNote: createNoteRequest,
};

Kanban.propTypes = {
  lanes: PropTypes.array,
  createLane: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Kanban);
