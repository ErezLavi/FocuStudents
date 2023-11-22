class Task {
  id: string;
  name: string;
  description: string;
  courseId: string;
  isCompleted: boolean;
  isChosen: boolean;

  constructor(
    taskName: string,
    taskDescription: string,
    courseId: string,
    isCompleted: boolean,
    isChosen: boolean
  ) {
    this.id = new Date().toISOString();
    this.name = taskName;
    this.description = taskDescription;
    this.courseId = courseId;
    this.isCompleted = isCompleted;
    this.isChosen = isChosen;
  }
}

export default Task;
