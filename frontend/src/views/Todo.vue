<template>
  <div class="todo-container">
    <!-- Header -->
    <div class="header">
      <h1>Todo List</h1>
      <button class="logout-btn" @click="handleLogout">
        <LogOutIcon size="22" />
      </button>
    </div>

    <!-- New Todo Form -->
    <form @submit.prevent="addTodo" class="todo-form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Enter new todo"
        required
      />
      <button type="submit">
        <PlusIcon size="20" />
      </button>
    </form>

    <!-- Todo List -->
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.task }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">
          <TrashIcon size="20" />
        </button>
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
import { LogOutIcon, PlusIcon, TrashIcon } from "lucide-vue-next";

interface Todo {
  id: number;
  task: string;
}

export default {
  name: "Todo",
  components: { LogOutIcon, PlusIcon, TrashIcon },
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
  max-width: 500px;
  margin: 50px auto;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  color: #333;
  font-family: "Poppins", sans-serif;
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
  color: #065f46;
}

.logout-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #f87171;
  cursor: pointer;
  transition: color 0.3s ease;
}

.logout-btn:hover {
  color: #dc2626;
}

/* Todo Form */
.todo-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-form input {
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  color: #065f46;
}

.todo-form button {
  background: #10b981;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.todo-form button:hover {
  background: #059669;
}

/* Todo List */
.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e6fffa;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
  transition: transform 0.2s ease-in-out;
}

.todo-list li:hover {
  transform: scale(1.02);
}

/* Delete Button */
.delete-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #f87171;
  cursor: pointer;
  transition: color 0.3s ease;
}

.delete-btn:hover {
  color: #dc2626;
}

/* Error Message */
.error {
  color: #f87171;
  text-align: center;
  margin-top: 10px;
}
</style>
