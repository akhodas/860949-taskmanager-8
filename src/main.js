import createFilter from "./create-filter";
import renderField from './render-field';
import Task from './task';
import TaskEdit from './task-edit';

import ConfigTask from './config-task';

let taskComponentsList = [];
let editTaskComponentsList = [];

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

const renderFilters = (configFilters) => {
  const createFiltersList = (config = []) => config.map(createFilter).join(``);

  renderField(`.main__filter`, createFiltersList(configFilters));
};

const renderTasks = (componentsList, configTask) => {
  const taskContainer = document.querySelectorAll(`.board__tasks`)[0];

  if (taskContainer) {
    if (configTask) {
      configTask.forEach((element) => {
        const taskComponent = new Task(element);
        componentsList.push(taskComponent);
        const editTaskComponent = new TaskEdit(element);
        editTaskComponentsList.push(editTaskComponent);

        taskComponent.onEdit = () => {
          editTaskComponent.render();
          taskContainer.replaceChild(editTaskComponent.element, taskComponent.element);
          taskComponent.unrender();
        };

        editTaskComponent.onSave = (newObject) => {
          const newElement = {};
          newElement.title = newObject.title;
          newElement.tags = newObject.tags;
          newElement.color = newObject.color;
          newElement.repeatingDays = newObject.repeatingDays;
          newElement.dueDate = newObject.dueDate;
          newElement.isDate = newObject.isDate;
          newElement.isArchive = newObject.isArchive;
          newElement.isFavorite = newObject.isFavorite;

          taskComponent.update(newElement);
          taskComponent.render();
          taskContainer.replaceChild(taskComponent.element, editTaskComponent.element);
          editTaskComponent.unrender();
        };
        editTaskComponent.onDelete = () => {
          taskComponent.delete();
          taskContainer.removeChild(editTaskComponent.element);
          editTaskComponent.unrender();
          editTaskComponent.delete();
        };
      });
    }

    componentsList.forEach((element) => {
      taskContainer.appendChild(element.render());
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
  const taskContainer = document.querySelectorAll(`.board__tasks`)[0];
  arr.forEach((task) => {
    if (task.element) {
      taskContainer.removeChild(task.element);
      task.unrender();
    }
  });
};

renderFilters(configurationFilters);
renderTasks(taskComponentsList, generateListConfigTasks(7));

const elementsFilter = document.querySelectorAll(`.filter__label`);

for (let i = 0; i < elementsFilter.length; i++) {
  elementsFilter[i].addEventListener(`click`, () => {
    undrawOldTask();
    renderTasks(taskComponentsList, generateListConfigTasks(Math.round(Math.random() * 7)));
  });
}
