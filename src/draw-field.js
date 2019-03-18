const drawField = (className, textHTML) => {

  const boardTasks = document.querySelectorAll(className)[0];

  if (boardTasks) {
    boardTasks.innerHTML = textHTML;
  }

};

export default drawField;
