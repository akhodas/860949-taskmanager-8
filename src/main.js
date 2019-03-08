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

const drawTasks = (configTask) => {
  const taskContainer = document.getElementsByClassName(`board__tasks`)[0];

  if (taskContainer) {
    configTask.forEach((element) => {
      const taskComponent = new Task(element);
      const editTaskComponent = new TaskEdit(element);

      taskContainer.appendChild(taskComponent.render());

      taskComponent.onEdit = () => {
        editTaskComponent.render();
        taskContainer.replaceChild(editTaskComponent.element, taskComponent.element);
        taskComponent.unrender();
      };
      editTaskComponent.onSubmit = () => {
        taskComponent.render();
        taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
        editTaskComponent.unrender();
      };
    });
  }
};

drawFilters(configurationFilters);
drawTasks(generateListConfigTasks(7));

const elementsFilter = document.getElementsByClassName(`filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    drawTasks(generateListConfigTasks(Math.round(Math.random() * 7)));
  });
}
