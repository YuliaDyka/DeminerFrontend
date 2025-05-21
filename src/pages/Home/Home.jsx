import { number, string } from "yup";
import "./Home.css";
import React, { useState, useEffect } from "react";
import { Menu, Button, Flex } from "antd";
import DataTable from "react-data-table-component";
import { Autocomplete, TextField } from "@mui/material";
import Moment from "moment";

import { get_all_sessions, save_session_request } from "../../API/api";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HomePage = () => {
  const [started, setStarted] = useState(false);
  const [commands, setCommands] = useState([]);
  const mappedArray = [...commands];
  mappedArray.map((x) => x * x).sort();
  const [index, setIndex] = useState(10);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions();
  }, []);

  const [selectedSession, setSelectedSession] = useState(null);

  const [formData, setFormData] = useState({
    id: 0,
    index: index,
    speed: number,
    angle: number,
    duration: 0,
    distance: 0,
  });

  const setActionCommands = (e) => {
    formData.id = 0;

    setCommands([...commands, { ...formData }]);
    let i = index;

    if (commands?.length !== 0) {
      let clone = commands.slice(0);
      clone.push(formData);
      clone.forEach((c) => {
        c.index = Number(c.index);
      });
      let sortCommands = clone.sort((a, b) => b.index - a.index);
      i = sortCommands[0].index + 10;
      setIndex(i + 10);
    } else {
      i = index + 10;
    }

    formData.index = i;
    formData.speed = "";
    formData.angle = "";
    formData.distance = 0;
    formData.duration = 0;
  };

  const clickSaveSession = (e) => {
    save_session_request(commands, (response) => {
      console.log(response);
    });
  };
  const deleteCommandById = (e) => {
    if (selectedSession === null) {
      let filters = commands.filter(function (com) {
        return com.index !== e.index;
      });

      const clone = commands.slice(0);
      clone.forEach((c) => {
        c.index = Number(c.index);
      });
      let sortCommands = clone.sort((a, b) => b.index - a.index);

      let i = sortCommands[0].index + 10;
      setIndex(i);
      formData.index = i;
      setCommands(commands.filter((c) => c.index !== e.index));
    } else {
    }
  };

  const handleChange = (e) => {
    let value = e.target.value == "" ? null : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  function getSessions() {
    get_all_sessions()
      .then((result) => {
        setSessions(result);
        console.log(result);
      })
      .catch((error) => {
        console.log("no server response ", error);
        setSessions([]);
      });
  }

  const columns = [
    {
      name: "Index",
      selector: (row) => row.index,
      sortable: true,
    },
    {
      name: "Speed",
      selector: (row) => row.speed,
    },
    {
      name: "Angle",
      selector: (row) => row.angle,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
    },
    {
      name: "Distance",
      selector: (row) => row.distance,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="action_btn">
          <button onClick={() => handleUpdate(row)} style={{ color: "blue" }}>
            Update
          </button>
          <button
            onClick={() => deleteCommandById(row)}
            style={{ color: "red" }}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="page-container2">
      <button onClick={() => setStarted(true)} className="send_button">
        Connect
      </button>
      <div className="container-main">
        <div></div>
        <div>
          <div className="input-box">
            <div className="input-item">
              <label>Index</label>
              <input
                placeholder="Index.."
                type="number"
                name="index"
                value={formData.index}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Speed</label>
              <input
                placeholder="Speed.."
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Turning angle</label>
              <input
                placeholder="Angle.."
                type="number"
                name="angle"
                value={formData.angle}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Duration</label>
              <input
                placeholder="Duration.."
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Distance</label>
              <input
                placeholder="Distance.."
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
              ></input>
            </div>

            <Flex align="center" gap="small">
              <Button
                className="btn-send"
                type="primary"
                onClick={() => {
                  setActionCommands(formData);
                }}
              >
                Send
              </Button>
            </Flex>
          </div>
        </div>
      </div>
      <div style={{ padding: 5 }}>
        <h4 style={{ margin: 10 }}>Select a Session</h4>
        <Autocomplete
          options={sessions}
          value={selectedSession}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              const clone = newValue.commands.slice(0);
              clone.forEach((c) => {
                c.index = Number(c.index);
              });
              let sortCommands = clone.sort((a, b) => a.index - b.index);

              setCommands([...sortCommands]);
              setSelectedSession(newValue);
              let i = sortCommands[0].index + 10;
              setIndex(i);
              formData.index = i;
            } else {
              setCommands([]);
              setSelectedSession(null);
            }
          }}
          getOptionLabel={(option) =>
            Moment(option.date).format("YYYY-MM-DD  HH:mm")
          }
          renderInput={(params) => (
            <TextField {...params} label="Select Session" variant="outlined" />
          )}
          style={{ width: 300 }}
        />
      </div>

      <div className=" commands-app">
        <DataTable
          title="Commands"
          columns={columns}
          data={commands}
          fixedHeader
          pagination
        />
      </div>
      <button
        disabled={commands?.length === 0}
        className="send_button"
        onClick={() => clickSaveSession()}
      >
        Save
      </button>
    </div>
  );
};

export default HomePage;
