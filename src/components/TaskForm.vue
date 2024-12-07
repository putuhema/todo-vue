<script setup>
import { ref, computed } from "vue";
import { useTodoStore } from "@/utils/store";
import { storeToRefs } from "pinia";

const store = useTodoStore();
const { currentId } = storeToRefs(store);
const currentTodo = computed(() => {
  return currentId.value ? store.get(currentId.value) : null;
});

const taskInput = ref({
  title: currentTodo.value ? currentTodo.value.text.title : "",
  description: currentTodo.value ? currentTodo.value.text.description : "",
});

const onSubmit = () => {
  if (!taskInput.value.title) return;
  if (currentId.value) {
    store.edit(currentId.value, taskInput.value);
    currentId.value = null;
  } else {
    store.add(taskInput.value);
    taskInput.value = { title: "", description: "" };
  }
};

const toggleForm = () => {
  currentId.value = null;
};
</script>
<template>
  <section>
    <form @submit.prevent @submit="onSubmit" class="border rounded-lg">
      <div class="p-2 flex flex-col">
        <input
          v-model="taskInput.title"
          class="outline-none placeholder:font-bold font-bold"
          placeholder="Task name"
        />
        <textarea
          v-model="taskInput.description"
          class="outline-none"
          placeholder="Description"
        />
      </div>
      <div class="flex items-center justify-end gap-2 border border-p p-2">
        <button
          @click="toggleForm"
          type="button"
          class="bg-gray-300/70 hover:bg-gray-300 font-bold text-gray-500 text-sm py-2 px-4 rounded-lg"
        >
          Cancel
        </button>
        <button
          class="bg-red-500/70 hover:bg-red-500 text-white font-bold text-sm py-2 px-4 rounded-lg"
        >
          {{ currentId ? "Save" : "Add" }}
        </button>
      </div>
    </form>
  </section>
</template>
