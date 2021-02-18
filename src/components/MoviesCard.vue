<template>
  <div class="wrapper-card">
    <loaderComponent v-if="isLoading" />
    <div
      class="card"
      v-for="(movie, index) in movies"
      :key="index"
      @click="showDetailMovie(movie)"
    >
      <div class="cover">
        <img :src="movie.medium_cover_image" :alt="movie.title" />
      </div>
      <div class="content">
        <div>
          <h3>{{ movie.title_long }}</h3>
        </div>
        <div>
          <p>
            Rating <span>{{ movie.rating }}</span> | Idioma
            <span>{{ movie.language }}</span>
          </p>
        </div>
      </div>
    </div>
    <modalComponent
      v-if="showModal"
      @close="showModal = false "
      :elements="movie"
    />
  </div>
</template>

<script>
import { URI_API } from "@/services";
import axios from "axios";
import ModalComponent from "@/components/Modal";
import LoaderComponent from "@/components/Loader";

export default {
  data() {
    return {
      isLoading: false,
      showModal: false,
      movie: [],
    };
  },
  props: {
    movies: {
      type: [Object, Array],
    },
  },
  watch: {
    showModal(value) {
      if(!value) {
         this.movie = []
      }
    }
  },
  methods: {
    async showDetailMovie(item) {
      this.isLoading = true
      try {
        const response = await axios.get(
          `${URI_API}v2/movie_details.json?movie_id=${item.id}`
        );

        const { data } = response.data;

        this.movie = data.movie;
        this.showModal = true;
        this.isLoading = false

      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    ModalComponent,
    LoaderComponent
  },
};
</script>

<style lang="scss" scoped>
.wrapper-card {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  .card {
    flex: 100%;
    margin: 5px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
    border: 1px solid #f2f2f2;
    box-shadow: 0px -5px 4px rgba(0, 0, 0, 0.05);
    cursor: pointer;

    .cover {
      img {
        width: 100%;
        display: block;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
    }
    .content {
      padding: 10px;
      h3 {
        margin: 0;
        font-size: 22px;
      }
      p {
        font-size: 12px;
        span {
          background-color: #c8a633;
          border-radius: 3px;
          padding: 2px 5px;
          color: #ffffff;
          font-weight: bold;
        }
      }
    }
  }
}
</style>