<!-- /src/App.vue -->
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="app-container">
    <nav class="navbar">
      <h1 class="logo">Todo App</h1>
    </nav>

    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
/* Global App Styles */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #d4f7c5, #a8e6cf);
  font-family: Arial, sans-serif;
  padding: 10px;
}

/* Navbar */
.navbar {
  background-color: white;
  width: 100%;
  max-width: 800px;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #2d6a4f;
  margin: 0;
}

/* Main Content */
.main-content {
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
