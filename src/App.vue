<script setup>
import TaskForm from "./components/TaskForm.vue";
import Task from "./components/Task.vue";
import { useTodoStore } from "@/utils/store";
import { Plus, PlusCircle } from "lucide-vue-next";
import { ref } from "vue";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { currentId } = storeToRefs(store);
const showForm = ref(false);

const toggleForm = () => {
  showForm.value = !showForm.value;
};
</script>

<template>
  <header class="p-4">
    <h1 class="text-start text-xl font-bold">Todo</h1>
  </header>
  <main class="max-w-xl mx-auto space-y-6">
    <Task v-if="store.todos.length > 0" />
    <button
      @click="toggleForm"
      class="text-gray-400 inline-flex group items-center gap-2 hover:text-gray-600"
    >
      <Plus class="w-4 h-4 block group-hover:hidden transition-all" />
      <PlusCircle class="w-4 h-4 hidden group-hover:block transition-all" />
      Add Task
    </button>
    <TaskForm v-if="showForm && !currentId" />
    <div>
      <div v-for="t in todos" key="t">{{ t }}</div>
    </div>
  </main>
</template>
