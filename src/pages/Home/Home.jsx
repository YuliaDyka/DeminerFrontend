import { number, string } from "yup";
import "./Home.css";
import React, { useState } from "react";
import { Menu, Button, Flex } from "antd";
import DataTable from "react-data-table-component";

import { save_session_request } from "../../API/api";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HomePage = () => {
  const [formData, setFormData] = useState({
    id: 0,
    index: 0,
    speed: 0,
    angle: 0,
    duration: 0,
    distance: 0,
  });

  const [started, setStarted] = useState(false);
  const [commands, setCommands] = useState([]);

  const setActionCommands = (e) => {
    formData.id = commands.length;
    let l = commands.length;
    debugger;
    formData.index = commands.length > 1 ? 1 * 10 : commands.length * 10;
    debugger;
    setCommands([...commands, { ...formData }]);

    formData.speed = "";
    formData.angle = "";
    formData.distance = 0;
    formData.duration = 0;
  };

  const clickSaveSession = (e) => {
    var date = new Date().toUTCString();

    save_session_request(commands, (response) => {
      debugger;
      console.log(response);
    });
  };

  const handleChange = (e) => {
    let value = e.target.value == "" ? null : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

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
            onClick={() => handleDelete(row.index)}
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
                placeholder="Write your speed.."
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Turning angle</label>
              <input
                placeholder="Write your turning angle.."
                type="number"
                name="angle"
                value={formData.angle}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Duration</label>
              <input
                placeholder="Write your duration.."
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-item">
              <label>Distance</label>
              <input
                placeholder="Write your distance.."
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
              ></input>
            </div>

            <Flex align="center" gap="small">
              <h4>{localStorage.getItem("login").username}</h4>
              <Button
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

      <div className=" commands-app">
        <DataTable
          title="Commands"
          columns={columns}
          data={commands}
          fixedHeader
          pagination
        />
      </div>
      <button className="send_button" onClick={() => clickSaveSession()}>
        Save
      </button>
    </div>
  );
};

export default HomePage;
