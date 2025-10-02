<script setup>
import { useAppStore } from "@/store";
import CustomLoader from "@/components/ui/CustomLoader.vue";

const store = useAppStore();

const goBack = () => {
  store.cityDetailData = null;
  store.getBoundsMain();
};
</script>

<template>
  <div class="place-detail">
    <button
      :disabled="store.isLoadingDetails"
      :class="{ disabled: store.isLoadingDetails }"
      class="back-btn"
      @click="goBack"
    >
      Назад
    </button>

    <CustomLoader
      :is-loading="store.isLoadingDetails"
      text-show="Завантаження детальної інформації..."
      v-if="store.isLoadingDetails"
    />

    <div v-else class="place-detail__container">
      <div v-if="store.cityDetailData">
        <table class="place-detail__table">
          <tr
            v-if="
              store.cityDetailData.name || store.cityDetailData.display_name
            "
          >
            <td class="place-detail__label">Назва:</td>
            <td class="place-detail__value">
              {{
                store.cityDetailData.name || store.cityDetailData.display_name
              }}
            </td>
          </tr>

          <tr v-if="store.cityDetailData.address?.country">
            <td class="place-detail__label">Країна:</td>
            <td class="place-detail__value">
              {{ store.cityDetailData.address.country }}
            </td>
          </tr>

          <tr v-if="store.cityDetailData.address?.district">
            <td class="place-detail__label">Район:</td>
            <td class="place-detail__value">
              {{ store.cityDetailData.address.district }}
            </td>
          </tr>

          <tr v-if="store.cityDetailData.address?.state">
            <td class="place-detail__label">Область:</td>
            <td class="place-detail__value">
              {{ store.cityDetailData.address.state }}
            </td>
          </tr>

          <tr v-if="store.cityDetailData.osm_id">
            <td class="place-detail__label">ID населеного пункту:</td>
            <td class="place-detail__value">
              {{ store.cityDetailData.osm_id }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Кнопка "Назад" */
.back-btn {
  margin-bottom: 10px;
  padding: 5px 10px;
  background-color: #41b782;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #369f6a;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 5px #369f6a;
  }

  &:active {
    transform: scale(0.95);
  }
}

/* Контейнер для таблицы */
.place-detail__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Таблица */
.place-detail__table {
  width: 100%;
  border-collapse: collapse;
}

.place-detail__label {
  font-size: 14px;
  font-weight: 600;
  color: #3498db;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.place-detail__value {
  font-size: 14px;
  color: #555;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.place-detail__table tr:last-child td {
  border-bottom: none;
}

/* Лоадер */
.disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
  box-shadow: none;

  &:hover {
    background-color: #a5d6a7;
  }
}
</style>
