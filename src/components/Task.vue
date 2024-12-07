<script setup>
import draggable from "vuedraggable";

import { storeToRefs } from "pinia";
import { Check, PenLine, Ellipsis } from "lucide-vue-next";
import { useTodoStore } from "@/utils/store";
import TaskForm from "./TaskForm.vue";

const store = useTodoStore();
const { todos, currentId } = storeToRefs(store);

const handleToggleTask = (id) => {
  store.toggle(id);
};

const handleSetCurrentId = (id) => {
  store.setCurrentId(id);
};
</script>
<template>
  <div class="space-y-2">
    <draggable tag="div" :list="todos" item-key="id" handle>
      <template #item="{ element }">
        <TaskForm v-if="currentId === element.id" />
        <div
          v-else
          class="flex items-start justify-between border-b group py-4"
        >
          <div class="flex items-start gap-2 cursor-pointer">
            <button
              @click="handleToggleTask(element.id)"
              class="h-5 w-5 rounded-full border cursor-pointer group"
            >
              <Check
                class="w-full text-gray-400 opacity-0 hover:opacity-100 transition-opacity duration-200"
                :class="{ 'opacity-100': element.completed }"
              />
            </button>
            <div>
              <h2 :class="{ 'line-through': element.completed }">
                {{ element.text.title }}
              </h2>
              <p class="text-sm text-gray-400">
                {{ element.text.description }}
              </p>
            </div>
          </div>
          <div
            class="inline-flex opacity-0 group-hover:opacity-100 gap-2 text-gray-400"
          >
            <button
              @click="handleSetCurrentId(element.id)"
              class="p-1 hover:bg-gray-100 rounded-md"
            >
              <PenLine class="w-5 h-5" />
            </button>
            <button class="p-1 hover:bg-gray-100 rounded-md">
              <Ellipsis class="w-5 h-5" />
            </button>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>
