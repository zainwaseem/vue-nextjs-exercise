<template>
  <div class="todo-container">
    <!-- Header -->
    <div class="header">
      <h1>Todo List</h1>
      <button class="logout-btn" @click="handleLogout">
        <LogOutIcon :size="22" />
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
        <SendIcon :size="20" />
      </button>
    </form>

    <!-- Todo List -->
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.task }}</span>
        <button class="delete-btn" @click="deleteTodo(todo.id)">
          <TrashIcon :size="20" />
        </button>
      </li>
    </ul>

    <!-- Error Message -->
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axiosInstance"; // Import Axios instance

// ✅ Import Lucide Icons
import { Send, Trash, LogOut } from "lucide-vue-next";

interface Todo {
  id: number;
  task: string;
}

export default {
  name: "Todo",
  components: {
    SendIcon: Send,
    TrashIcon: Trash,
    LogOutIcon: LogOut,
  },
  setup() {
    const todos = ref<Todo[]>([]);
    const newTask = ref("");
    const error = ref("");
    const router = useRouter();

    const getTodos = async () => {
      try {
        const response = await api.get("/todos");
        todos.value = response.data;
      } catch (err) {
        error.value = "Failed to fetch todos";
      }
    };

    const addTodo = async () => {
      try {
        const response = await api.post("/todos", { task: newTask.value });
        todos.value = response.data;
        newTask.value = "";
      } catch (err) {
        error.value = "Failed to add todo";
      }
    };

    const deleteTodo = async (id: number) => {
      try {
        const response = await api.delete(`/todos/${id}`);
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
  border-radius: 10px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
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
.todo-form input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

.todo-form input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
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
/* Scrollable Todo List */
.todo-list {
  max-height: 500px; /* Set a max height */
  overflow-y: auto; /* Enable vertical scrolling */
  list-style: none;
  padding: 0;
  scrollbar-width: thin;
  scrollbar-color: #10b981 #f0fdfa; /* Custom scrollbar */
  scroll-behavior: smooth;
  overflow-x: hidden;
}

/* Custom Scrollbar for WebKit Browsers */
.todo-list::-webkit-scrollbar {
  width: 6px;
}

.todo-list::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 10px;
}

.todo-list::-webkit-scrollbar-track {
  background: #f0fdfa;
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
