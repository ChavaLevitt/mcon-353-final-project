import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Park } from "../parkCard/Park";
import "./home.css";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { SearchContext } from "../app/searchContext";

export const Home = (props) => {
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
          list: { data },
        });
      });
  };

  return (
    <div>
      <div style={{ width: "75%", margin: "auto" }}>
        <div>
          <div style={{ position: "relative", marginTop: "2%" }}>
            <form onSubmit={() => search(parkCode)}>
              <TextField
                sx={{
                  background: "rgba(255,255,255,0.7)",
                }}
                fullWidth
                label="Enter 2 digit state code"
                variant="filled"
                id="filled-basic"
                value={parkCode}
                onChange={(e) => setParkCode(e.target.value)}
              />
            </form>

            <IconButton
              style={{ position: "absolute", bottom: "2%", right: "1%" }}
            >
              <SearchIcon
                style={{ height: "100%", color: "black" }}
                fontSize="large"
                variant="outlined"
                onClick={() => search(parkCode)}
              >
                Go
              </SearchIcon>
            </IconButton>
          </div>
        </div>
      </div>

      <div id="grid1" style={{ width: "75%", marginTop: "2%", margin: "auto" }}>
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
