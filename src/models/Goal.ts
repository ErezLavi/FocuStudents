class Goal {
  isGoal: boolean;
  numOfIntervals: number;
  numOfCompletedIntervals: number;
  isCompleted: boolean;

  constructor(
    isGoal: boolean,
    numOfIntervals: number,
    numOfCompletedIntervals: number,
    isCompleted: boolean
  ) {
    this.isGoal = isGoal;
    this.numOfIntervals = numOfIntervals;
    this.numOfCompletedIntervals = numOfCompletedIntervals;
    this.isCompleted = isCompleted;
  }
}

export default Goal;
