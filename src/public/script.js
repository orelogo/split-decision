import timer from './timer';
import $ from 'jquery';
import 'tocca';

const roundTimeMin = 5 * 60 * 1000;    // in milliseconds
let leftCount = 0;
let rightCount = 0;

function updateCount() {
  $('.left').text(leftCount);
  $('.right').text(rightCount);
  $('.swipe-time').text(Date.now() - timer.startTime);
}

function scoreLeft() {
  if (timer.isTimerOn) {
    leftCount++;
    updateCount();
  }
}

function scoreRight() {
  if (timer.isTimerOn) {
    rightCount++;
    updateCount();
  }
}

// function startTimer() {
//   timer.isTimerOn = true;
//   timer.startTime = Date.now();
//   $('.timer-button').text('Stop');
// }
//
// function stopTimer() {
//   timer.isTimerOn = false;
//   $('.timer-button').text('Start');
// }

$(document).ready(function() {

    $('.timer-button').on('click', function() {
        if (timer.isTimerOn === false) {
          timer.startTimer();
          $('.timer-button').text('Stop');
        } else {
          timer.stopTimer();
          $('.timer-button').text('Start');
        }
    });

    document.onkeydown = function(event) {
        if (event.code === 'ArrowLeft') {
            scoreLeft();
            console.log('Left arrow');
        }
        if (event.code === 'ArrowRight') {
            scoreRight();
            console.log('Right arrow');
        }
    };

    $(document).on('swipeleft', function(e, data) {
      scoreLeft();
      console.log('Left swipe');
    });

    $(document).on('swiperight', function(e, data) {
        scoreRight();
        console.log('Right swipe');
    });

});
