import React, { useState } from "react";
import PopUpModal from "./PopUpModal";
import { Progress } from "antd";

const initialState = {
  task_description: "",
  task_priority: "low",
  task_status: "To Do",
  progress_percent: 0,
};

const status = ["To Do", "In Progress", "Done"];

const List = () => {
  const [inputFields, setInputFields] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState({
    visible: false,
  });
  const [taskList, setTaskList] = useState([]);

  const hadleChange = (key, value) => {
    setInputFields((prevState) => ({ ...prevState, [key]: value }));
  };
  const addList = () => {
    if (isModalOpen?.type === "edit") {
      taskList[isModalOpen?.id] = inputFields;
    } else {
      taskList.push({ ...inputFields, id: (taskList?.length + 1).toString() });
    }
    setTaskList(taskList);
    setInputFields(initialState);
    setIsModalOpen(false);
  };

  const handleStatus = (ele, index) => {
    const taskListTemp = taskList ? [...taskList] : [];
    switch (ele?.task_status) {
      case status[0]:
        taskListTemp[index] = {
          ...taskListTemp[index],
          task_status: status[1],
          progress_percent: 50,
        };
        break;
      case status[1]:
        taskListTemp[index] = {
          ...taskListTemp[index],
          task_status: status[2],
          progress_percent: 100,
        };
        break;
      case status[2]:
        taskListTemp[index] = {
          ...taskListTemp[index],
          task_status: status[0],
          progress_percent: 0,
        };
        break;
      default:
        setTaskList([]);
    }
    setTaskList(taskListTemp);
  };

  return (
    <div className="page-wrapper">
      <div className="top-title">
        <h2>Task List</h2>
        <button
          className="button"
          onClick={() => {
            setIsModalOpen({ visible: true });
          }}
        >
          <i className="fa fa-plus"></i>
          Add Task
        </button>
      </div>
      <div className="task-container">
        <PopUpModal
          title={`${isModalOpen?.type === "edit" ? "Edit" : "Add"} Task`}
          classNames="pop-up"
          open={isModalOpen?.visible}
          onCancel={() => setIsModalOpen({ visible: false })}
          footer={[
            <button
              className="add-button"
              onClick={() => {
                addList();
              }}
            >
              {isModalOpen?.type === "edit" ? "Edit" : "Add"}
            </button>,
          ]}
        >
          <div className="modal-content">
            <form>
              <div className="add-edit-modal-contnent">
                <div className="input">
                  <label className="label">Task</label>
                  <input
                    type="text"
                    placeholder="Type your task here..."
                    name="task_description"
                    value={inputFields?.task_description}
                    onChange={(e) => {
                      hadleChange("task_description", e?.target?.value);
                    }}
                  ></input>
                </div>
                <div className="modal-priority">
                  <span className="label">Priority</span>
                  <ul className="priority-buttons">
                    <li
                      className={
                        inputFields?.task_priority === "high"
                          ? "high-selected high"
                          : "high"
                      }
                      onClick={() => {
                        hadleChange("task_priority", "high");
                      }}
                    >
                      high
                    </li>
                    <li
                      className={
                        inputFields?.task_priority === "medium"
                          ? "medium-selected medium"
                          : "medium"
                      }
                      onClick={() => {
                        hadleChange("task_priority", "medium");
                      }}
                    >
                      medium
                    </li>
                    <li
                      className={
                        inputFields?.task_priority === "low"
                          ? "low-selected low"
                          : "low"
                      }
                      onClick={() => {
                        hadleChange("task_priority", "low");
                      }}
                    >
                      low
                    </li>
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </PopUpModal>
        {taskList?.map((ele, index) => (
          <div className="task-card" key={index}>
            <div className="flex w-100">
              <span className="task-title">Task</span>
              <span className="task">{ele?.task_description}</span>
            </div>
            <div className="flex">
              <span className="priority-title">Priority</span>
              <span className="medium-priority priority">
                {ele?.task_priority}
              </span>
            </div>
            <div className="task-status-wrapper">
              <button
                className="status"
                onClick={() => handleStatus(ele, index)}
              >
                {ele?.task_status}
              </button>
            </div>
            <div className="progress">
              <Progress
                type="dashboard"
                percent={ele?.progress_percent}
                size={40}
              />
            </div>
            <div className="actions ">
              <i
                className="fas fa-edit icon edit-icon"
                onClick={() => {
                  setIsModalOpen({ visible: true, type: "edit", id: index });
                  setInputFields(ele);
                }}
              />
              <i
                className="fa-solid fa-trash icon delete-icon"
                onClick={() => {
                  const tempTaskList = taskList.filter(
                    (item) => item.id !== ele?.id
                  );
                  setTaskList(tempTaskList);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
