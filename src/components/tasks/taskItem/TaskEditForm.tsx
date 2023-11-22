
import React from "react";

interface TaskEditFormProps {
  task: {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
  };
  editTaskHandler: (event: React.FormEvent) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editedTaskName: string;
  setEditedTaskName: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  editedTaskDescription: string;
  setEditedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  editTaskHandler,
  setIsEdit,
  editedTaskName,
  setEditedTaskName,
  errorMessage,
  setErrorMessage,
  editedTaskDescription,
  setEditedTaskDescription,
}) => {
  return (
    <form id={task.id} onSubmit={editTaskHandler}>
      <div>
        <label>Name:</label>
      </div>
      <input
        type="text"
        defaultValue={editedTaskName}
        onChange={(e) => setEditedTaskName(e.target.value)}
      ></input>
      <span style={{ color: "#860A35" }}>{errorMessage}</span>
      <div>
        <label>Description:</label>
      </div>
      <input
        type="text"
        defaultValue={editedTaskDescription}
        onChange={(e) => setEditedTaskDescription(e.target.value)}
      ></input>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsEdit(false);
            // Use task.name here instead of editedTask.name
            setEditedTaskName(task.name);
            setErrorMessage("");
          }}
        >
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default TaskEditForm;