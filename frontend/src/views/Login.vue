<!-- /src/views/Login.vue -->
<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>Sign in to your account</h2>
        <p class="login-subtitle">Use username: user, password: pass123</p>
      </div>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <!-- <label for="username" class="visually-hidden">Username</label> -->
          <input
            id="username"
            v-model="username"
            type="text"
            required
            placeholder="Username"
            :disabled="isLoading"
          />
        </div>

        <div class="form-group">
          <!-- <label for="password" class="visually-hidden">Password</label> -->
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Password"
            :disabled="isLoading"
          />
        </div>

        <button type="submit" class="login-button" :disabled="isLoading">
          <span class="button-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{ isLoading ? "Signing in..." : "Sign in" }}
        </button>

        <div v-if="error" class="error-message">
          <span class="error-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

onMounted(() => {
  const token = localStorage.getItem("token");
  if (token) {
    router.push("/todos");
  }
});

const handleLogin = async () => {
  try {
    isLoading.value = true;
    error.value = "";

    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      router.push("/todos");
    } else {
      error.value = data.error || "Invalid credentials";
    }
  } catch (err) {
    error.value = "An error occurred during login";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.login-container {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: linear-gradient(to bottom right, #d1fae5, #a7f3d0);
}

.login-box {
  width: 100%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #065f46;
}

.login-subtitle {
  font-size: 0.875rem;
  color: #047857;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: center; /* Ensures center alignment */
  width: 100%;
}

.form-group {
  width: 100%; /* Ensures input fields take full width */
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 100%; /* Makes sure input fields take full width */
  max-width: 100%; /* Prevents extra shifting */
  padding: 0.8rem;
  border: 2px solid #d1d5db;
  border-radius: 6px;
  font-size: 1rem;
  color: #065f46;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.3);
}

input:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
}

.login-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0.9rem;
  background-color: #10b981;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #059669;
}

.login-button:active {
  background-color: #047857;
}

.login-button:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.button-icon {
  margin-right: 8px;
  width: 1.2rem;
  height: 1.2rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fee2e2;
  border-radius: 6px;
  color: #991b1b;
  font-size: 0.9rem;
}

.error-icon {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
