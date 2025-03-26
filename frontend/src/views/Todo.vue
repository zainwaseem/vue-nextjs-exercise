<template>
  <div class="todo-container">
    <!-- Header -->
    <div class="header">
      <h1>Todo List</h1>
      <button class="logout-btn" @click="handleLogout">Logout</button>
    </div>

    <!-- New Todo Form -->
    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Enter new todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>

    <!-- Todo List -->
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.task }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>

    <!-- Error Message -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

interface Todo {
  id: number;
  task: string;
}

export default {
  name: "Todo",
  setup() {
    const todos = ref<Todo[]>([]);
    const newTask = ref("");
    const error = ref("");
    const router = useRouter();

    const getTodos = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/todos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        todos.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch todos";
      }
    };

    const addTodo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:3000/api/todos",
          { task: newTask.value },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        todos.value = response.data;
        newTask.value = "";
      } catch (err) {
        error.value = "Failed to add todo";
      }
    };

    const deleteTodo = async (id: number) => {
      try {
        const token = localStorage.getItem("token");
        console.log(id);
        const response = await axios.delete(
          `http://localhost:3000/api/todos/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        todos.value = response.data;
      } catch (err) {
        error.value = "Failed to delete todo";
      }
    };

    const handleLogout = () => {
      localStorage.removeItem("token");
      router.push({ name: "Login" });
    };

    onMounted(() => {
      getTodos();
    });

    return { todos, newTask, error, addTodo, deleteTodo, handleLogout };
  },
};
</script>

<style scoped>
/* Custom CSS for the Todo App */
.todo-container {
  max-width: 450px;
  margin: 40px auto;
  padding: 20px;
  background: #1e1e1e;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  color: #fff;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 1.8rem;
  font-weight: bold;
}

.logout-btn {
  background: #ff4c4c;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-btn:hover {
  background: #d73838;
}

.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-form input {
  flex: 1;
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}

.todo-form button {
  background: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.todo-form button:hover {
  background: #388e3c;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2a2a2a;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.delete-btn {
  background: #ff4c4c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.delete-btn:hover {
  background: #d73838;
}

.error {
  color: #ff4c4c;
  text-align: center;
  margin-top: 10px;
}
</style>
