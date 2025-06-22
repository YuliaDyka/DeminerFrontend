import { number, string } from "yup";
import "./Home.css";
import { useState, useEffect } from "react";
import { Button, Flex } from "antd";
import DataTable from "react-data-table-component";
import { Autocomplete, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import {
  get_all_sessions,
  save_session_request,
  delete_request,
  update_commands_request,
  save_commands_request,
  getSession_by_id,
} from "../../API/api";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const HomePage = () => {
  const [connect, setConnected] = useState(false);
  const [isVideoChecked, setVideoChecked] = useState(false);
  const [urlVideo, setUrlVideo] = useState("");
  const [commands, setCommands] = useState([]);

  const [index, setIndex] = useState(10);

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    getSessions();
  }, []);

  const [selectedSession, setSelectedSession] = useState(null);

  const [formDataName, setFormDataName] = useState({
    name: string,
  });

  const [formData, setFormData] = useState({
    id: 0,
    index: index,
    speed: number,
    angle: number,
    duration: 0,
    distance: 0,
  });

  const [active, setActive] = useState();
  const [timer, setTimer] = useState();
  const [defaultIndexes, setDefaultIndexes] = useState([]);
  const [timerIndex, setTimerIndex] = useState();
  const [activeCommand, setActiveCommand] = useState();

  const toggleTimer = () => {
    if (timer) {
      clearInterval(timer);
      setTimer(undefined);
      setActive(false);
      setTimerIndex(null);
    } else {
      setActive(true);

      let counter = 0;
      let index = defaultIndexes[counter];
      let commandActive = commands.find((com) => com.index === index);
      let intervalTime = commandActive.duration * 1000;

      setTimerIndex(index);

      const timerId = setInterval(() => {
        if (counter === defaultIndexes?.length - 1) {
          counter = 0;
          clearInterval(timerId);
          setTimer(undefined);
          setActive(false);
          setTimerIndex(null);
        } else {
          index = defaultIndexes[counter];
          if (counter > 0) {
            commandActive = commands.find((com) => com.index === index);
            intervalTime = commandActive.duration * 1000;
          }

          setTimerIndex(index);

          counter++;
        }
      }, 10000); //  intervalTime // commandActive.duration * 1000);

      setTimer(timerId);
    }
  };

  function isEmptyFormData() {
    let isDurationDistance = formData.duration === 0 && formData.distance === 0;
    let result = formData.speed?.length === 0 || !formData.angle?.length === 0;

    return (
      result ||
      isDurationDistance ||
      (!selectedSession && formDataName.name?.length === 0)
    );
  }

  const setActionCommands = (e) => {
    if (isEmptyFormData()) {
      return;
    }
    if (selectedSession) {
      formData.session_id = selectedSession.id;
      if (formData.id != 0) {
        update_commands_request(e.id, formData)
          .then((response) => {
            alert(response);

            getSessionById(selectedSession.id);
          })
          .catch((error) => {
            console.log("no server response ", error);
          });
      } else {
        save_commands_request(formData)
          .then((response) => {
            alert(response);
            getSessionById(selectedSession.id);
          })
          .catch((error) => {
            console.log("no server response ", error);
          });
      }
    } else {
      setCommands([...commands, { ...formData }]);

      save_session_request(formDataName.name, [formData])
        .then((result) => {
          alert(result);
          setSelectedSession(result);
          getSessionById(result.id);
        })
        .catch((error) => {
          console.log("no server response ", error);
        });
    }
  };
  function setDefaultFormData(displayCommands) {
    let i = index;
    if (displayCommands?.length !== 0) {
      let clone = displayCommands.slice(0);
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
  }

  const deleteCommandById = (e) => {
    let filters = commands.filter(function (com) {
      return com.index !== e.index;
    });

    const clone = filters.slice(0);
    clone.forEach((c) => {
      c.index = Number(c.index);
    });
    let sortCommands = clone.sort((a, b) => b.index - a.index);

    let i = sortCommands[0].index + 10;
    setIndex(i);

    formData.index = i;
    setCommands(filters);
    if (selectedSession != null) {
      delete_request(e.id)
        .then((result) => {
          alert(result);
        })
        .catch((error) => {
          console.log("no server response ", error);
        });
    }
  };

  const handleUpdate = (e) => {
    if (selectedSession) {
      // setIsUpdate(false);
    }
    setFormData(e);
  };

  const handleChange = (e) => {
    let value = e.target.value == "" ? null : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };
  const handleNameChange = (e) => {
    let value = e.target.value == "" ? null : e.target.value;
    setFormDataName({ ...formDataName, [e.target.name]: value });
  };

  function getSessions() {
    get_all_sessions()
      .then((result) => {
        setSessions(result);
      })
      .catch((error) => {
        console.log("no server response ", error);
        setSessions([]);
      });
  }

  function getSessionById(session_id) {
    getSession_by_id(session_id)
      .then((result) => {
        let sortCommands = result.commands.sort((a, b) => a.index - b.index);

        setCommands([...sortCommands]);
        setDefaultFormData(result.commands);
      })
      .catch((error) => {
        console.log("no server response ", error);
        setSessions([]);
      });
  }

  const handleCheckedVideo = (e) => {
    setVideoChecked(!isVideoChecked);

    if (e.target.checked) {
      setUrlVideo("http://vdykyi.ddns.net:8889/stream");
    } else {
      setUrlVideo("");
    }
  };

  const handleMove = (direction) => {
    console.log("Move:", direction);
    // Додай тут свою логіку руху
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
      name: "Duration sec.",
      selector: (row) => row.duration,
    },
    // {
    //   name: "Distance",
    //   selector: (row) => row.distance,
    // },
    {
      name: "Action",
      cell: (row) => (
        <div className="action_btn">
          <button
            hidden={!selectedSession}
            onClick={() => handleUpdate(row)}
            style={{ color: "blue" }}
          >
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

  const conditionalRowStyles = [
    {
      when: (row) => row.index === timerIndex,
      style: {
        backgroundColor: "green",
        userSelect: "none",
      },
    },
  ];

  return (
    <div className="page-container2">
      <div className="header-box">
        <button
          onClick={() => setConnected(true)}
          className="send_button connect_btn"
        >
          Connect
        </button>
        <div hidden={selectedSession} className="input-box">
          <div className="input-item">
            <label hidden={selectedSession}>New Session Name</label>
            <input
              hidden={selectedSession}
              placeholder="Session name.."
              type="text"
              name="name"
              value={formDataName.name}
              onChange={handleNameChange}
            ></input>
          </div>
        </div>
      </div>

      <div hidden={selectedSession} style={{ padding: 5 }}></div>
      <div className="container-main">
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
              <label>Duration sec.</label>
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
                disabled="true"
                placeholder="Distance.."
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
              ></input>
            </div>

            <Flex align="center" gap="small">
              <Button
                disabled={isEmptyFormData()}
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
              setSelectedSession(newValue);

              const clone = newValue.commands?.slice(0);
              clone.forEach((c) => {
                c.index = Number(c.index);
              });
              let sortCommands = clone.sort((a, b) => a.index - b.index);

              setCommands([...sortCommands]);
              setDefaultIndexes(sortCommands.map((c) => c.index));

              let i = sortCommands[sortCommands?.length - 1]?.index + 10;

              if (sortCommands?.length != 0) {
                setIndex(i);
                formData.index = i;
              } else {
                setIndex(10);
                formData.index = 10;
              }
            } else {
              getSessions();
              setCommands([]);
              setSelectedSession(null);
              setIndex(10);
              setDefaultIndexes([]);
              formData.index = 10;
              formDataName.name = "";

              // clearInterval timer
              clearInterval(timer);
              setTimer(undefined);
              setActive(false);
              setTimerIndex(null);
            }
          }}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} label="Select Session" variant="outlined" />
          )}
          style={{ width: 300 }}
        />
      </div>

      <div className="main-box">
        <div className="commands-app">
          {selectedSession && commands?.length != 0 ? (
            <DataTable
              title="Saved Commands"
              columns={columns}
              data={commands}
              fixedHeader
              // pagination
              conditionalRowStyles={conditionalRowStyles}
              fixedHeaderScrollHeight="350px"
            />
          ) : (
            <DataTable
              title="New Commands"
              columns={columns}
              data={commands}
              fixedHeader

              // pagination
            />
          )}
        </div>

        <div className="video">
          <iframe
            src={urlVideo}
            scrolling="no"
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            }}
          ></iframe>
        </div>
      </div>
      <div className="action">
        <div>
          {" "}
          <button
            disabled={!selectedSession}
            className="btn-move"
            onClick={toggleTimer}
          >
            {timer ? "Stop move" : "Start move"}
          </button>
          {active ? `${timerIndex} - ` + `${timer}` + " active" : ""}
          {/* {active ? `${timerIndex}` + " active" : ""} */}
        </div>
        <div className="video-btn-box">
          <div className="flax justin-center " style={{ marginTop: 10 }}>
            <Checkbox
              checked={isVideoChecked}
              onChange={handleCheckedVideo}
            ></Checkbox>
            <label>{isVideoChecked ? "Turn off video" : "Start video"}</label>
          </div>

          <div className="button-grid">
            <button
              onClick={() => handleMove("up")}
              className="direction-button up"
            >
              ↑
            </button>
            <button
              onClick={() => handleMove("left")}
              className="direction-button left"
            >
              ←
            </button>
            <button
              onClick={() => handleMove("stop")}
              className="direction-button stop"
            >
              ⏹
            </button>
            <button
              onClick={() => handleMove("right")}
              className="direction-button right"
            >
              →
            </button>
            <button
              onClick={() => handleMove("down")}
              className="direction-button down"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
