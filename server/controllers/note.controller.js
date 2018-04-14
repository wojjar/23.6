import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
}
/*===== Add  ===== */
export function addNote(req, res) {
  const { note, laneId } = req.body;

  if (!note || !note.task || !laneId) {
    res.status(400).end();
  }

  const newNote = new Note({
    task: note.task,
  });

  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: laneId })
      .then(lane => {
        console.log('lane: ', lane);
        if (!lane) {
          res.status(500).send(`Lane with id "${laneId}" is not defined `);
          return 0;
        }
        lane.notes.push(saved) 
        return lane.save();
      })
      .then(() => {
        res.json(saved);
      });
  });
}
/*===== Edit ===== */
export function updateNote(req, res) {
  const note = req.body;

  Note.findOneAndUpdate({id: req.params.noteId}, note, {new: true}, (err, saved) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(saved);
  })
}

/*===== Delete ===== */
export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    note.remove(() => {
      res.status(200).end();
    });
  });
}