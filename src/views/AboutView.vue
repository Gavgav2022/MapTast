<script setup>
import MainLayout from "@/layouts/MainLayout.vue";
</script>

<template>
  <MainLayout>
    <template #default>
      <section class="about">
        <h1>About</h1>
        <p>
          This is the About page. Add project information, links, or any content
          describing your app here.
        </p>
        <router-link to="/">Back to Home</router-link>
      </section>
    </template>
  </MainLayout>
</template>

<style scoped>
.about {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial;
  color: #333;
}

.about h1 {
  margin: 0 0 12px;
  font-size: 2rem;
}

.about p {
  line-height: 1.6;
  margin-bottom: 16px;
}

.about a {
  color: #42b883;
  text-decoration: none;
}
</style>
