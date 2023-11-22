class Timer {
  timerMode: string;
  isPaused: boolean;
  secondsLeft: number;
  focusTime: number;
  breakTime: number;

  constructor(
    timerMode: string,
    isPaused: boolean,
    secondsLeft: number,
    focusTime: number,
    breakTime: number
  ) {
    this.focusTime = focusTime;
    this.breakTime = breakTime;
    this.timerMode = timerMode;
    this.isPaused = isPaused;
    this.secondsLeft = secondsLeft;
  }
}

export default Timer;
