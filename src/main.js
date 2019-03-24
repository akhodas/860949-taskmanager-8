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

const filterTasks = (tasks, filterName) => {
  switch (filterName) {
    case `filter__all`:
    case `filter__all-count`:
      return tasks;

    case `filter__overdue`:
    case `filter__overdue-count`:
      return tasks.filter((it) => it._dueDate < Date.now());

    case `filter__today`:
    case `filter__today-count`:
      return tasks.filter((it) =>
        new Date().toDateString() === new Date(it._dueDate).toDateString());

    case `filter__favorites`:
    case `filter__favorites-count`:
      return tasks.filter((it) => it._isFavorite);

    case `filter__repeating`:
    case `filter__repeating-count`:
      return tasks.filter((it) => it._state.isRepeated);
    case `filter__tags`:
    case `filter__tags-count`:
      return tasks.filter((it) => it._tags.size);

    case `filter__archive`:
    case `filter__archive-count`:
      return tasks.filter((it) => it._isArchive);
    default :
      return [];
  }
};

const renderFilters = (configFilters) => {
  const filterContainer = document.querySelectorAll(`.main__filter`)[0];

  if (filterContainer) {
    configFilters.forEach((element) => {
      const filterComponent = new Filter(element);
      filterConponentsList.push(filterComponent);

      filterContainer.appendChild(filterComponent.render());

      filterComponent.onFilter = (evt) => {
        unrenderOldTask();
        const filterName = evt.target.htmlFor ? evt.target.htmlFor : evt.target.className;

        const filteredTasks = filterTasks(taskComponentsList, filterName);
        renderTasks(filteredTasks);
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
      if (!element.isDeleted) {
        taskContainer.appendChild(element.render());
      }
    });
  }
};

const unrenderOldTask = () => {
  checkListOnRender(taskComponentsList);
  checkListOnRender(editTaskComponentsList);
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
