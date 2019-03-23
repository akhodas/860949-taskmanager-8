import Task from './task';
import TaskEdit from './task-edit';
import Filter from './filter';

import ConfigTask from './config-task';

let taskComponentsList = [];
let editTaskComponentsList = [];
const filterConponentsList = [];

const configurationFilters = [
  {
    title: `all`,
    count: 9,
    checked: true
  },
  {
    title: `overdue`,
    count: 8
  },
  {
    title: `today`,
    count: 7
  },
  {
    title: `favorites`,
    count: 0
  },
  {
    title: `repeating`,
    count: 5
  },
  {
    title: `tags`,
    count: 4
  },
  {
    title: `archive`,
    count: 33
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
  const filterContainer = document.querySelectorAll(`.main__filter`)[0];

  if (filterContainer) {
    configFilters.forEach((element) => {
      const filterComponent = new Filter(element);
      filterConponentsList.push(filterComponent);

      filterContainer.appendChild(filterComponent.render());

      filterComponent.onFilter = () => {
        console.log(`check filter`);
        unrenderOldTask();
        renderTasks(taskComponentsList, generateListConfigTasks(Math.round(Math.random() * 7)));
      };

    });
  }
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

const unrenderOldTask = () => {
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
