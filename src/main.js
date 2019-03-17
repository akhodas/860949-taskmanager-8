import createFilter from "./create-filter";
import drawField from './draw-field';
import Task from './task';
import TaskEdit from './task-edit';

import ConfigTask from './config-task';

const configurationFilters = [
  {
    id: `all`,
    count: 9,
    checked: true
  },
  {
    id: `overdue`,
    count: 8
  },
  {
    id: `today`,
    count: 7
  },
  {
    id: `favorites`,
    count: 0
  },
  {
    id: `repeating`,
    count: 5
  },
  {
    id: `tags`,
    count: 4
  },
  {
    id: `archive`,
    count: 3
  }
];

const generateListConfigTasks = (count) => {
  const listConfigTasks = [];
  for (let i = 0; i < count; i++) {
    listConfigTasks.push(new ConfigTask());
  }
  return listConfigTasks;
};

const drawFilters = (configFilters) => {
  const createFiltersList = (config = []) => config.map(createFilter).join(``);

  drawField(`main__filter`, createFiltersList(configFilters));
};

let taskComponentsList = [];
let editTaskComponentsList = [];

const drawTasks = (configTask) => {
  const taskContainer = document.getElementsByClassName(`board__tasks`)[0];

  if (taskContainer) {
    configTask.forEach((element) => {
      const taskComponent = new Task(element);
      taskComponentsList.push(taskComponent);
      const editTaskComponent = new TaskEdit(element);
      editTaskComponentsList.push(editTaskComponent);

      taskContainer.appendChild(taskComponent.render());

      taskComponent.onEdit = () => {
        editTaskComponent.render();
        taskContainer.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();
      };
      // editTaskComponent.onSave = () => {
      //   taskComponent.render();
      //   taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
      //   editTaskComponent.unrender();
      // };
      editTaskComponent.onSave = (newObject) => {
        element.title = newObject.title;
        element.tags = newObject.tags;
        element.color = newObject.color;
        element.repeatingDays = newObject.repeatingDays;
        element.dueDate = newObject.dueDate;
        element.isDate = newObject.isDate;

        taskComponent.update(element);
        taskComponent.render();
        taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();
      };
      editTaskComponent.onDelete = () => {
        taskComponent.render();
        taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();
      };
    });
  }
};

const undrawOldTask = () => {
  checkListOnRender(taskComponentsList);
  taskComponentsList = [];
  checkListOnRender(editTaskComponentsList);
  editTaskComponentsList = [];
};

const checkListOnRender = (arr = []) => {
  const taskContainer = document.getElementsByClassName(`board__tasks`)[0];
  arr.forEach((task) => {
    if (task.element) {
      taskContainer.removeChild(task.element);
      task.unrender();
    }
  });
};

drawFilters(configurationFilters);
drawTasks(generateListConfigTasks(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    undrawOldTask();
    drawTasks(generateListConfigTasks(Math.round(Math.random() * 7)));
  });
}
