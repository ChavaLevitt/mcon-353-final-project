import { React, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Park } from "../parkCard/Park";
import PushPinIcon from "@mui/icons-material/PushPin";
import "./home.css";
import IconButton from "@mui/material/IconButton";
import park from "../../parkimg.jpg";
import {useContext} from "react";
import { SearchContext } from "../app/searchContext";

export const Home = (props) => {
  const [parks, setParks] = useState([]);
  const [parkCode, setParkCode] = useState("");

  const searchContext = useContext(SearchContext);

  const search = (props) => {
    fetch(
      `https://developer.nps.gov/api/v1/parks?stateCode=${props}&api_key=5mroWmh53h64MgSfZssT1BIbJ0WrKqmV62CsW7yi`
    )
      .then((response) => response.json())
      .then((data) => {
        searchContext.listDispatch({
          type: "create",
          list: {data},
        });
        //setParks(data.data);
      });
  };



  return (
    <div>
      <div style={{ width: "75%", margin: "auto"}}>
      <img
          src={park}
          style={{
            height: "300px",
            width: "100%",
            margin: "auto",
            marginTop: "2%",
          }}
        />
        </div>
      <div 
      style={{ width: "75%", margin: "auto"}}
      >
        
        <div
        //  style={{position: "absolute", bottom: "5%", left: "2%", padding: "5px"}}
          >
          <table>
            <tr >
              <td style={{ width: "100%", margin: "auto" }} >
                <TextField sx={{
                background: 'rgba(255,255,255,0.7)'
                  // 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, ' +
                  // 'rgba(255,255,255,0.3) 70%, rgba(255,255,255,0) 100%)'
                }}
                  fullWidth
                  label="Enter 2 digit state code"
                  variant="filled"
                  id="filled-basic"
                  value={parkCode}
                  onChange={(e) => setParkCode(e.target.value)}
                 
                />
              </td>
              <td>
                <IconButton>
                  <SearchIcon
                    
                    style={{ height: "100%", color: "black" }}
                    fontSize="large"
                    variant="outlined"
                    onClick={() => search(parkCode)}
                  >
                    Go
                  </SearchIcon>
                </IconButton>
              </td>
            </tr>
          </table>
        </div>
      </div>

      <div id="grid" style={{ width: "75%", marginTop: "5%", margin: "auto" }}>
        {searchContext.listState.map((park, index) => (
          <div>
            <Park
              key={index}
              index={index}
              park={park}
              addPinnedParks={props.addPinnedParks}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
