<template>
  <MainLayout>
    <template #default>
      <div class="contacts-page">
        <header class="hero">
          <div class="hero-inner">
            <h1>Contact Us</h1>
            <p class="lead">
              Questions, orders or partnership inquiries? We'd love to hear from
              you.
            </p>
          </div>
        </header>

        <main class="container">
          <section class="grid">
            <div class="card contact-card">
              <h2>Get in touch</h2>
              <form
                @submit.prevent="handleSubmit"
                novalidate
                class="contact-form"
                :aria-busy="sending"
              >
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    v-model.trim="form.name"
                    :disabled="sending"
                    required
                  />
                  <small v-if="errors.name" class="error">{{
                    errors.name
                  }}</small>
                </label>

                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    v-model.trim="form.email"
                    :disabled="sending"
                    required
                  />
                  <small v-if="errors.email" class="error">{{
                    errors.email
                  }}</small>
                </label>

                <label>
                  <span>Subject</span>
                  <input
                    type="text"
                    v-model.trim="form.subject"
                    :disabled="sending"
                  />
                </label>

                <label>
                  <span>Message</span>
                  <textarea
                    v-model.trim="form.message"
                    :disabled="sending"
                    rows="6"
                    required
                  ></textarea>
                  <small v-if="errors.message" class="error">{{
                    errors.message
                  }}</small>
                </label>

                <div class="actions">
                  <button type="submit" :disabled="sending" class="btn primary">
                    {{ sending ? "Sending..." : "Send Message" }}
                  </button>
                  <button
                    type="button"
                    class="btn"
                    @click="reset"
                    :disabled="sending"
                  >
                    Reset
                  </button>
                </div>

                <p v-if="notice" class="notice" role="status">{{ notice }}</p>
              </form>
            </div>

            <aside class="card info-card" aria-label="Contact information">
              <h3>Contact information</h3>
              <ul class="info-list">
                <li>
                  <strong>Address</strong>
                  <div>123 Agro Lane<br />Greenfield, GA 12345</div>
                </li>
                <li>
                  <strong>Phone</strong>
                  <div><a href="tel:+1234567890">+1 (234) 567-890</a></div>
                </li>
                <li>
                  <strong>Email</strong>
                  <div>
                    <a href="mailto:info@example.com">info@example.com</a>
                  </div>
                </li>
                <li>
                  <strong>Hours</strong>
                  <div>Mon–Fri: 9:00–17:00</div>
                </li>
              </ul>

              <h4>Find us</h4>
              <div class="map">
                <!-- Replace src with your real map embed link -->
                <iframe
                  title="Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.13%2C51.50%2C-0.11%2C51.52&amp;layer=mapnik"
                  loading="lazy"
                ></iframe>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </template>
  </MainLayout>
</template>

<script setup>
import { reactive, ref } from "vue";
import MainLayout from "@/layouts/MainLayout.vue";

const form = reactive({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});

const sending = ref(false);
const notice = ref("");

function validate() {
  errors.name = form.name ? "" : "Name is required.";
  errors.email = /^\S+@\S+\.\S+$/.test(form.email)
    ? ""
    : "A valid email is required.";
  errors.message = form.message ? "" : "Message is required.";
  return !errors.name && !errors.email && !errors.message;
}

function reset() {
  form.name = "";
  form.email = "";
  form.subject = "";
  form.message = "";
  errors.name = errors.email = errors.message = "";
  notice.value = "";
}

async function handleSubmit() {
  notice.value = "";
  if (!validate()) {
    notice.value = "Please fix the errors above.";
    return;
  }

  sending.value = true;
  try {
    // Simulate API request. Replace with your real API call.
    await new Promise((r) => setTimeout(r, 900));

    notice.value = "Message sent. We will get back to you shortly.";
    reset();
  } catch (e) {
    notice.value = "Failed to send message. Please try again later.";
  } finally {
    sending.value = false;
  }
}
</script>

<style scoped>
:root {
  --bg: #f7faf7;
  --card: #ffffff;
  --muted: #6b7280;
  --accent: #1f7a2e;
  --danger: #dc2626;
}

.contacts-page {
  min-height: 100vh;
  background: var(--bg);
  color: #0f172a;
  display: flex;
  flex-direction: column;
}

/* Hero */
.hero {
  background: linear-gradient(
    90deg,
    rgba(31, 122, 46, 0.08),
    rgba(31, 122, 46, 0.02)
  );
  padding: 2.5rem 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(15, 23, 42, 0.04);
}
.hero-inner {
  max-width: 960px;
  margin: 0 auto;
}
.hero h1 {
  margin: 0 0 0.25rem;
  font-size: 1.75rem;
}
.lead {
  color: var(--muted);
  margin: 0;
}

/* Layout */
.container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 1.25rem;
  align-items: start;
}

.card {
  background: var(--card);
  border-radius: 8px;
  padding: 1.25rem;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
}

/* Form */
.contact-form label {
  display: block;
  margin-bottom: 0.75rem;
}
.contact-form span {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.5rem 0.65rem;
  border: 1px solid #e6e9ee;
  border-radius: 6px;
  font: inherit;
  background: #fff;
  box-sizing: border-box;
}
.contact-form textarea {
  resize: vertical;
  min-height: 120px;
}
.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  align-items: center;
}
.btn {
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #e6e9ee;
  background: transparent;
  cursor: pointer;
}
.btn.primary {
  background: var(--accent);
  color: white;
  border-color: rgba(0, 0, 0, 0.04);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  color: var(--danger);
  font-size: 0.875rem;
  display: block;
  margin-top: 0.25rem;
}
.notice {
  margin-top: 0.75rem;
  color: var(--muted);
}

/* Info card */
.info-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
  display: grid;
  gap: 0.75rem;
}
.info-list li strong {
  display: block;
  color: #0f172a;
  margin-bottom: 0.25rem;
}
.info-list a {
  color: var(--accent);
  text-decoration: none;
}

.map {
  height: 200px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #edf0f5;
}
.map iframe {
  width: 100%;
  height: 100%;
  border: 0;
}

/* Responsive */
@media (max-width: 880px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .info-card {
    order: 2;
  }
}
</style>
