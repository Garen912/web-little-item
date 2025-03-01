<template>
  <div class="list-item">
    <div class="list-container">
      <ul>
        <li v-for="todo in todoList" :key="todo.id">
          <div class="order-number">{{ todo.index }}</div>

          <div class="todo-text">{{ todo.text }}</div>

          <!-- <div class="todo-dueDate">{{ todo.dueDate }}</div> -->

          <div class="todo-priority">{{ todo.priority }}</div>

          <div class="operate-btn">
            <div v-if="!todo.completed" class="complete-btn">
              <el-button type="text" @click="completeTodo(todo)">Complete</el-button>
            </div>
            <div class="del-btn">
              <el-button type="text" @click="delTodo(todo)">Delete</el-button>
            </div>
          </div>

        </li>
      </ul>
    </div>

    <div class="pagination">
      <el-pagination :current-page="curPage" :page-size="pageSize" :page-sizes="[10, 20, 50]" size="small"
        :pager-count="5" background layout="total, sizes, pager, jumper" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { ElButton, ElPagination } from 'element-plus'
import { defineProps, ref, reactive, watch } from 'vue';

const curPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const todoList = reactive([]);
let activeName = '';

const props = defineProps({
  todos: {
    type: Array,
    required: true
  },
  activeName: {
    type: String,
    required: true
  }
});
const emit = defineEmits(['completeTodo', 'delTodo']);


watch(() => props, () => {
  if (activeName !== props.activeName) {
    curPage.value = 1;
    pageSize.value = 10;
  }
  initTodoList();
}, {
  deep: true
});

function initTodoList() {
  activeName = props.activeName;
  const sourceList = JSON.parse(JSON.stringify(props.todos.filter(todo => activeName === 'completed' === todo.completed)));
  sourceList.forEach((todo, index) => {
    todo.index = index + 1;
  })
  total.value = sourceList.length;
  todoList.splice(0, todoList.length, ...sourceList.slice((curPage.value - 1) * pageSize.value, curPage.value * pageSize.value));
};

function handleSizeChange(val) {
  pageSize.value = val;
  initTodoList();
};

function handleCurrentChange(val) {
  curPage.value = val;
  initTodoList();
};

function completeTodo(todo) {
  emit('completeTodo', todo);
}

function delTodo(todo) {
  emit('delTodo', todo);
};

initTodoList();

</script>

<style scoped>
@import '@/styles/mobileStyle.css';

.list-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
  height: 322px;
  overflow: auto;
}

.list-item li {
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  height: 32px;
  line-height: 32px;
  position: relative;
}

.list-item .order-number {
  display: inline-block;
  box-sizing: border-box;
  width: 40px;
  text-align: center;
}

.list-item .todo-text {
  display: inline-block;
  width: 50%;
  box-sizing: border-box;
  padding-right: 8px;
  text-align: left;
  overflow: hidden;    /* 隐藏溢出内容 */
  white-space: nowrap; /* 禁止换行 */
  text-overflow: ellipsis; /* 显示省略号 */

  /* 允许自然换行 */
  /* white-space: normal;  */
  /* 长单词换行 */
  /* word-wrap: break-word;  */
  /* 更激进的断行（谨慎使用） */
  /* word-break: break-all;  */
}

.list-item .todo-priority {
  display: inline-block;
  width: auto;
  text-align: left;
}

.list-item .operate-btn {
  position: absolute;
  right: 0;
  display: flex;
}

.list-item .del-btn {
  display: inline-block;
  padding: 0 5px;
}

.list-item .complete-btn {
  display: inline-block;
  padding: 0 5px;
}

.list-item li:hover .complete-btn,
.list-item li:hover .del-btn {
  display: inline-block;
}
</style>