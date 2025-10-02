<template>
  <div :class="['sidebar', { collapsed: isCollapsed }]">
    <button
      :class="['toggle-btn', { collapsed: isCollapsed }]"
      @click="toggleSidebar"
    >
      ►
    </button>

    <div :class="['search-box', { collapsed: isCollapsed }]">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск по населенным пунктам"
        @input="filterPlaces"
      />
    </div>

    <div
      v-if="!store.isLoadingDetails && !store.cityDetailData"
      :class="['places-list', { collapsed: isCollapsed }]"
    >
      <CustomLoader
        :isLoading="store.isLoading"
        text-show="Завантаження даних ..."
      />
      <span
        class="no-results"
        v-if="filteredPlacesList?.length === 0 && searchQuery.length > 0"
      >
        Немає збігів по запиту "{{ searchQuery }}"
      </span>
      <CardGlobal
        v-for="place in filteredPlacesList"
        :key="place.data.id"
        :place="place"
        @click="goToCard(place)"
      />
    </div>
    <PlaceDetail
      v-else
      class="place-detail"
      :class="{ collapsed: isCollapsed }"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useAppStore } from "@/store";
import CustomLoader from "@/components/ui/CustomLoader.vue";
import CardGlobal from "@/components/home/CardGlobal.vue";
import PlaceDetail from "@/components/home/PlaceDetail.vue";
const store = useAppStore();

const filteredPlacesList = ref();
const searchQuery = ref("");

const filterPlaces = () => {
  filteredPlacesList.value = store.cityCache?.filter((place) =>
    place.data.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const goToCard = (place) => {
  const newBounds = [
    [Number(place.data.boundingbox[0]), Number(place.data.boundingbox[3])],
    [Number(place.data.boundingbox[1]), Number(place.data.boundingbox[2])],
  ];
  store.bounds = newBounds;
  store.fetchPlaceDetails(place.data);
};

watch(store.cityCache, () => {
  filterPlaces();
});

onMounted(() => {
  filteredPlacesList.value = store.cityCache;
});
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  width: 100%;
  max-width: 300px;
  padding: 20px 10px 0 10px;
  height: 100%;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.sidebar.collapsed {
  width: 30px;
  padding: 0;
  transition: all 0.3s ease;
}

.search-box {
  width: 100%;
  opacity: 1;
  transition: all 0.3s ease;
}

.search-box.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.search-box input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.places-list {
  padding-bottom: 10px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  opacity: 1;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #3498db #f1f1f1;
  transition: all 0.3s ease;

  &::-webkit-scrollbar {
    width: 4px;
    height: 2px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #3498db;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
}

.places-list.collapsed {
  width: 0;
  opacity: 0;
  padding: 0;
  overflow: hidden;
}

.toggle-btn {
  position: absolute;
  top: 20px;
  right: -10px;
  width: 30px;
  height: 30px;
  background: #333;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 10000;
  font-size: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(0.9);
  }
}

.toggle-btn.collapsed {
  transform: rotate(180deg);
}

.sidebar.collapsed .toggle-btn {
  right: -10px;
}

.place-detail.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease;
}

.no-results {
  text-align: center;
  color: #da0b0b;
  font-size: 12px;
  font-weight: 700;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
