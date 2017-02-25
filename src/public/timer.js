export default {

  startTime: 0,
  isTimerOn: false,

  startTimer() {
    this.isTimerOn = true;
    this.startTime = Date.now();
  },

  stopTimer() {
    this.isTimerOn = false;
  },
}

// export default {startTime, isTimerOn, startTimer, stopTimer}
