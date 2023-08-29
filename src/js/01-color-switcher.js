const bodyView = document.body;

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
btnStop.disabled = true;

let timeToChange = null;

function btnSwitchMode({ trueOrder = true } = {}) {
  btnStart.disabled = trueOrder;
  trueOrder = !trueOrder;
  btnStop.disabled = trueOrder;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function bcgColorChange() {
  document.body.style.background = getRandomHexColor();
}

btnStart.addEventListener('click', () => {
  bcgColorChange(), (timeToChange = setInterval(bcgColorChange, 1000));
  btnSwitchMode();
});

btnStop.addEventListener('click', () => {
  clearInterval(timeToChange);
  btnSwitchMode({ trueOrder: false });
});
