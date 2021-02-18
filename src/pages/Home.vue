<template>
  <div>
    <section class="wrapper">
      <loaderComponent v-if="statusLoading" />
      <article class="panel-search">
        <searchComponent v-model="insertSearch" />
        <selectorComponent
          :elements="genres"
          v-model="selectGenero"
          typeSelector="Género"
        />
        <selectorComponent
          :elements="quality"
          v-model="selectQuality"
          typeSelector="Calidad"
        />
        <button
          @click="clearFilters"
          :disabled="!selectGenero && !selectQuality"
          class="boton-clear"
        >
          <font-awesome-icon icon="trash" />
          Limpiar filtros
        </button>
      </article>
      <article class="panel-movies">
        <moviesCardComponent :movies="listsMovies" />
      </article>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import LoaderComponent from "@/components/Loader";
import SearchComponent from "@/components/Search";
import SelectorComponent from "@/components/Selector";
import MoviesCardComponent from "@/components/MoviesCard";
export default {
  data() {
    return {
      selectGenero: "",
      selectQuality: "",
      insertSearch: "",
      genres: [
        "Action",
        "Adventure",
        "Crime",
        "Drama",
        "Mystery",
        "Thriller",
        "Sci-Fi",
      ],
      quality: ["720p", "1080p", "2160p", "3D"],
    };
  },
  watch: {
    selectGenero() {
      this.$store.dispatch("loadMovies", {
        genero: this.selectGenero,
        quality: this.selectQuality,
      });
    },
    selectQuality() {
      this.$store.dispatch("loadMovies", {
        genero: this.selectGenero,
        quality: this.selectQuality,
      });
    },
  },
  created() {
    this.loadMovies({
      genero: this.selectGenero,
      quality: this.selectQuality,
    });
  },
  methods: {
    ...mapActions(["loadMovies"]),
    clearFilters() {
      (this.selectGenero = ""),
        (this.selectQuality = ""),
        this.$store.dispatch("loadMovies", {
          genero: "",
          quality: "",
        });
    },
  },
  computed: {
    ...mapGetters(["allMovies", "statusLoading"]),
    listsMovies() {
      if (this.insertSearch) {
        return this.allMovies.filter((elm) => {
          return this.insertSearch
            .toLowerCase()
            .split(" ")
            .every((v) => elm.title.toLowerCase().includes(v));
        });
      } else {
        return this.allMovies;
      }
    },
  },
  components: {
    SearchComponent,
    MoviesCardComponent,
    SelectorComponent,
    LoaderComponent,
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-content: center;
  justify-content: space-between;
  flex-direction: row;
  .panel-search {
    position: fixed;
    padding: 20px;
    width: 20%;
    background-color: #040404;
    height: 100%;
  }

  .panel-movies {
    background-color: #fafafa;
    width: 100%;
    margin-left: 22%;
    padding: 20px;
  }

  .boton-clear {
    width: 100%;
    padding: 15px 10px;
    border-radius: 50px;
    border: solid 1px #ffffff;
    background-color: #ffffff;
    color: #c8a633;
    font-size: 14px;
    outline: none;
    cursor: pointer;
    &:disabled {
      border: solid 1px #c8a6334d;
      background-color: transparent;
      cursor: not-allowed;
    }
  }
}
</style>