<template>
  <div class="todo-container">

    <div class="todo-header">
      <div class="title">
        <h1>Todo List</h1>
      </div>
    </div>

    <div class="todo-main">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="未完成" name="incomplete">
        </el-tab-pane>
        <el-tab-pane label="已完成" name="completed">
        </el-tab-pane>
      </el-tabs>

      <ListItem :activeName="activeName" :todos="todos" @delTodo="delTodo" @completeTodo="completeTodo" />
    </div>

    <div class="todo-footer">

      <div class="new-todo">
        <el-row :gutter="0">
          <el-col :span="18">
            <el-input v-model="newTodoText" style="width: 240px" placeholder="新待办文本" clearable />
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="addTodo">Add</el-button>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { ElRow, ElButton, ElTabs } from 'element-plus'
import ListItem from '../components/ListItem.vue';
import tasks from '../assets/tasks.json'

const newTodoText = ref('');
const activeName = ref('incomplete');
const todos = reactive([...tasks]);

watch(() => todos, () => {
  saveTasks()
});

function init() {
  const tasksVo = JSON.parse(localStorage.getItem('tasksVo')) || {};

  if (Object.keys(tasksVo).length === 0) {
    saveTasks()
  } else {
    getTasks(tasksVo)
  }
}

function getTasks(tasksVo) {
  activeName.value = tasksVo.activeName;
  todos.splice(0, todos.length, ...tasksVo.todos);
};

function saveTasks() {
  let tasksVo = {
    todos,
    activeName: activeName.value
  }
  localStorage.setItem('tasksVo', JSON.stringify(tasksVo));
};

function handleTabsClick(tab) {
  activeName.value = tab.props.name;
  saveTasks()
};

function addTodo() {
  if (!newTodoText.value) return;
  todos.push({
    id: todos.length + 1,
    text: newTodoText.value,
    completed: false,
    priority: 2
  });
  newTodoText.value = '';
};

function delTodo(todo) {
  const index = todos.findIndex(todoItem => todoItem.id === todo.id);
  todos.splice(index, 1);
};

function completeTodo(todo) {
  const index = todos.findIndex(todoItem => todoItem.id === todo.id);
  todos.splice(index, 1);
  todo.completed = !todo.completed
  todos.push(todo);
};

init();

</script>



<style scoped>
@import '@/styles/mobileStyle.css';

.todo-container {
  min-width: 475px;
  max-width: 800px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.todo-header .title {
  height: 50px;
  line-height: 50px;
  padding: 4px 0;
  border-bottom: 1px solid #42b883;
}

.todo-header h1 {
  font-size: 1.5em;
  color: #42b883;
}

.todo-main :deep(.el-tabs__nav-scroll) {
  padding-left: 8px;
}

.todo-main :deep(.el-tabs__header) {
  margin: 0 0 3px !important;
}

.todo-footer .new-todo {
  margin-top: 4px;
  border-top: 1px solid #42b883;
}

.todo-footer .el-input.el-input--suffix {
  width: 100% !important;
}

.todo-footer .el-button.el-button--primary {
  width: 100% !important;
}
</style>
