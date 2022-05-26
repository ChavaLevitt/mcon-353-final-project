import * as React from "react";
import { PinsContext } from "../app/context";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { VisitedContext } from "../app/visitedContext";
import { Button } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from '@mui/material/TextField';

export const ParkListItem = (props) => {
  const navigate = useNavigate();
  const [theNotes, setTheNotes] = useState("");
  const listContext = useContext(PinsContext);
  const visitedContext = useContext(VisitedContext);

  const updateData = (props) => {
    listContext.listDispatch({
      type: "remove",
      index: props.index,
    });
    listContext.listDispatch({
      type: "add",
      park: props.park,
      notes: theNotes,
    });
    setTheNotes("");
  };

  const deletePinPark = (index) => {
    listContext.listDispatch({
      type: "remove",

      index: index,
    });
  };

  const addVisited = (props) => {
    visitedContext.listDispatch({
      type: "add",
      index: props.index,
      park: props.park,
      parkid: props.park.park.parkCode,
    });
    deletePinPark(props.index);
  };

  return (
    <div>
      <Paper>
        <Checkbox
          checked={false}
          onClick={() => addVisited(props)}
          color="default"
        />
        <span onClick={() => navigate(`/parkInfo/${props.park.park.parkCode}`)}>
          {props.park.park.fullName}
        </span>

        <div>
          {/* <TextareaAutosize
            maxRows={4}
            aria-label="maximum height"
            placeholder="type notes here"
            value={theNotes}
            onChange={(e) => setTheNotes(e.target.value)}
            style={{ width: 200, marginLeft: "5%" }}
          /> */}
          <TextField id="outlined-basic" label="type notes here" variant="outlined"
            value={theNotes}
            onChange={(e) => setTheNotes(e.target.value)} style={{ width: 200, marginLeft: "5%" }}/>

          <div style={{ marginLeft: "5%" }}>Notes: {props.notes}</div>
        </div>

        <table>
          <tr>
            <td style={{ width: "95%" }}>
              <Button onClick={() => updateData(props)}>Save</Button>
            </td>
            <td>
              <Button onClick={() => deletePinPark(props.index)}>
                <DeleteIcon />
              </Button>
            </td>
          </tr>
        </table>
      </Paper>
    </div>
  );
};
