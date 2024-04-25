import React, { useEffect, useMemo  } from 'react';
import classes from "./DndList.module.css";
import cx from "clsx";
import { Text } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/tasks-slice";
import {editTasks} from "../../../store/tasks-slice";

const DndList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasksArr = useAppSelector((state) => state.tasks.tasks);
  const coursesArr = useAppSelector((state) => state.courses.courses);
  const [state, handlers] = useListState(tasksArr);
  const isEmpty: boolean = tasksArr.length === 0 ? true : false;

  const mapCourseColor = useMemo(() => (id: string) => {
    const currentCourse = coursesArr.find((course) => course.id === id);
    return currentCourse?.color;
  }, [coursesArr]);

  const chosenTask = tasksArr.find((task) => task.isChosen);

  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, {
            [classes.itemDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            {...provided.dragHandleProps}
            className={classes.dragHandle}
            style={
              chosenTask?.id === item.id && !item.isCompleted
                ? { backgroundColor: "#e9b384" }
                : { backgroundColor: "#F4F2DE" }
            }
            onClick={() => {
              const updatedTasks = state.map((task) => {
                if (task.id === item.id && !task.isCompleted) {
                  if (task.isChosen) {
                    return task;
                  }
                  return { ...task, isChosen: !task.isChosen };
                }
                return { ...task, isChosen: false };
              });

              handlers.setState(updatedTasks);
              dispatch(editTasks(updatedTasks));
            }}
          >
            <div
              style={{ backgroundColor: mapCourseColor(item.courseId) }}
            ></div>
            <section>
              <Text
                style={{
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: item.isCompleted ? "#666666" : "#000",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontWeight: "400",
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: item.isCompleted ? "#666666" : "#000",
                }}
              >
                {item.description}
              </Text>
            </section>
            <input
              className={classes.checkBox}
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => {
                const updatedTasks = state.map((task) =>
                  task.id === item.id
                    ? {
                        ...task,
                        isCompleted: !task.isCompleted,
                        isChosen: false,
                      }
                    : { ...task, isCompleted: task.isCompleted }
                );
                handlers.setState(updatedTasks);
                dispatch(editTasks(updatedTasks));
              }}
            />
          </div>
        </div>
      )}
    </Draggable>
  ));

  useEffect(() => {
    // Update tasks order in state when state changes
    dispatch(editTasks(state));
  }, [state, dispatch]);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {!isEmpty ? items : <p>No tasks found.. Wanna add some?</p>}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DndList;
