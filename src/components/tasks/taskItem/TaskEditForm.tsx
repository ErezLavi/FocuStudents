import React from "react";

interface TaskEditFormProps {
  task: {
    id: string;
    name: string;
    description: string;
    isCompleted: boolean;
    date: string;
  };
  editTaskHandler: (event: React.FormEvent) => void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editedTaskName: string;
  setEditedTaskName: React.Dispatch<React.SetStateAction<string>>;
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  editedTaskDescription: string;
  setEditedTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  editedTaskDate: string;
  setEditedTaskDate: React.Dispatch<React.SetStateAction<string>>;
}

const formatDate = (selectedDate: string) => {
  if (!selectedDate) {
    return "";
  }
  const [year, month, day] = selectedDate.split("-");
  return `${day}/${month}/${year.slice(2)}`;
};
function inverseFormatDate(formattedDate?: string): string {
  if (!formattedDate) {
    return '';
  }
  const [day, month, year] = formattedDate.split('/');
  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');
  // Create the YYYY-MM-DD format
  const isoDate = `20${year}-${formattedMonth}-${formattedDay}`;
  return isoDate; 
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
  setEditedTaskDate,
  editedTaskDate,
}) => {
  return (
    <form id={task.id} onSubmit={editTaskHandler}>
      <div>
        <label>Name</label>
      </div>
      <input
        type="text"
        id="name"
        defaultValue={editedTaskName}
        onChange={(e) => setEditedTaskName(e.target.value)}
      ></input>
      <span style={{ color: "#860A35" }}>{errorMessage}</span>
      <div>
        <label>Description</label>
      </div>
      <input
        type="text"
        id="description"
        defaultValue={editedTaskDescription}
        onChange={(e) => setEditedTaskDescription(e.target.value)}
      ></input>
      <div>
        <label>Date</label>
      </div>
      <input
        type="date"
        id="dateInput"
        defaultValue={inverseFormatDate(editedTaskDate)}
        onChange={(e) => setEditedTaskDate(formatDate(e.target.value))}
      ></input>
      <div>
        <button
          type="button"
          onClick={() => {
            setIsEdit(false);
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
