import Lane from '../models/lane';
import uuid from 'uuid';
import Note from '../models/note';

export function getSomething(req, res) {
  return res.status(200).end();
}

/*===== Add  ===== */
export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}
/*===== Get all ===== */
export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}
/*===== Delete ===== */
export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.notes.forEach((note) => {
      Note.findOneAndRemove({ id: req.params.noteId }, (err, note) => {
        if (err) {
          res.status(500).send(err);
        }
      });
    });

    lane.remove(() => {
      res.status(200).end();
    });
  });
}
/*===== Edit ===== */
// export function updateLane(req, res) {
//   const lane = req.body;
//   Lane.findOneAndUpdate({id: req.params.laneId}, lane, {new: true}, (err, lane) => {
//     if(err) {
//       res.status(500).send(err);
//     }
//     res.json({lane});
//   })
//  }

export function updateLane(req, res) {
  Lane.update({ id: req.params.laneId }, req.body.lane).exec((err, lane) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json({ lane })
  })
}