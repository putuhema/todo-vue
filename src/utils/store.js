import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    currentId: null,
    todos: [
      {
        id: 1,
        text: {
          title: "Buys Fruits",
          description: "buying fruits at 7 o'clock",
        },
        completed: false,
      },
      {
        id: 2,
        text: {
          title: "Buys Eggs",
          description: "buying fruits at 7 o'clock",
        },
        completed: false,
      },
      {
        id: 3,
        text: {
          title: "Buys melon",
          cription: "buying fruits at 7 o'clock",
        },
        completed: false,
      },
    ],
  }),
  actions: {
    setCurrentId(id) {
      this.currentId = id;
    },
    get(id) {
      return this.todos.find((todo) => todo.id === id);
    },
    edit(id, text) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos[index].text = text;
    },
    add(text) {
      this.todos.push({
        id: this.todos.length + 1,
        text,
        completed: false,
      });
    },
    remove(id) {
      const index = this.todos.findIndex((todo) => todo.id === id);
      this.todos.splice(index, 1);
    },
    toggle(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.completed = !todo.completed;
    },
  },
});
