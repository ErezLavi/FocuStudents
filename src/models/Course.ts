class Course {
  id: string;
  name: string;
  color: string;
  timeCounter: number;

  constructor(courseText: string, color: string, timeCounter: number) {
    this.id = new Date().toISOString();
    this.name = courseText;
    this.color = color;
    this.timeCounter = timeCounter;
  }
}

export default Course;
