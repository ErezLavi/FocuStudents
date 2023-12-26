class Task {
  id: string;
  name: string;
  description: string;
  courseId: string;
  isCompleted: boolean;
  isChosen: boolean;
  date: string;

  constructor(
    taskName: string,
    taskDescription: string,
    courseId: string,
    isCompleted: boolean,
    isChosen: boolean,
    date: string
  ) {
    this.id = new Date().toISOString();
    this.name = taskName;
    this.description = taskDescription;
    this.courseId = courseId;
    this.isCompleted = isCompleted;
    this.isChosen = isChosen;
    this.date = date;
  }
}

export default Task;
