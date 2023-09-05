import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');

btnStart.disabled = true;

let futureDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultData: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    futureDate = selectedDates[0];
    if (futureDate.getTime() < new Date().getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      // btnStart.disabled = true;
      return;
    }
    btnStart.disabled = false;
  },
};

flatpickr('#datetime-picker', options);
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;

function updateValue(days, hours, minutes, seconds) {
  document.querySelector('.value[data-days]').textContent = `${days}`;
  document.querySelector('.value[data-hours]').textContent = `${hours}`;
  document.querySelector('.value[data-minutes]').textContent = `${minutes}`;
  document.querySelector('.value[data-seconds]').textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}

btnStart.addEventListener('click', function () {
  const future = new Date(futureDate);

  setInterval(function () {
    const now = new Date();
    // const futureTime = new Data(futureDate).getTime();
    const distance = future - now;
    if (distance <= 0) {
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(distance);
    updateValue(
      addLeadingZero(days),
      addLeadingZero(hours),
      addLeadingZero(minutes),
      addLeadingZero(seconds)
    );
  }, 1000);
});
