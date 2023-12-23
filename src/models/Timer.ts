class Timer {
  timerMode: string;
  isPaused: boolean;
  secondsLeft: number;
  focusTime: number;
  breakTime: number;
  totalTimeCounter: number;

  constructor(
    timerMode: string,
    isPaused: boolean,
    secondsLeft: number,
    focusTime: number,
    breakTime: number,
    totalTimeCounter: number
  ) {
    this.timerMode = timerMode;
    this.isPaused = isPaused;
    this.secondsLeft = secondsLeft;
    this.focusTime = focusTime;
    this.breakTime = breakTime;
    this.totalTimeCounter = totalTimeCounter;
  }
}

export default Timer;
