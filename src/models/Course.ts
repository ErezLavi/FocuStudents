
class Course {
  id: string;
  name: string;
  color: string;


  constructor(courseText: string, color: string) {
    this.id = new Date().toISOString();
    this.name = courseText;
    this.color = color;
  }
}



export default Course;
