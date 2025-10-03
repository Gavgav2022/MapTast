<template>
  <header class="header">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style scoped>
.header {
  height: 58px;
  background-color: #333;
  color: white;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav {
  padding: 0;
}

nav ul {
  display: flex;
  list-style-type: none;
}

nav li {
  margin: 0 10px;
}

nav a {
  display: block;
  color: white;
  text-decoration: none;
  padding: 15px;
}

nav a:hover {
  text-decoration: underline;
}
</style>
