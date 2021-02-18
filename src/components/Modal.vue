<template>
  <div class="modal" @click="$emit('close')">
    <div class="modal-container" @click.stop>

      <div class="modal-panel" v-if="elements.length == null">
        <div class="poster-movie">
          <img :src="elements.large_cover_image" :alt="elements.title" />
        </div>
        <div class="decription-movie">
          <h2>{{ elements.title }}</h2>
          <p>{{ elements.description_full }}</p>
          <div class="panel-ficha lists-reset">
            <h4>Ficha</h4>
            <ul>
              <li>Año: {{ elements.year }}</li>
              <li>Rating: {{ elements.rating }}</li>
              <li>Descargas: {{ elements.download_count }}</li>
            </ul>
          </div>
          <div class="panel-genero lists-reset">
            <h4>Género</h4>
            <ul>
              <li v-for="(genero, index) in elements.genres" :key="index">
                {{ genero }}
              </li>
            </ul>
          </div>
          <div class="panel-torrents lists-reset">
            <h4>Torrents</h4>
            <ul>
              <li v-for="(torrent, index) in elements.torrents" :key="index">
                <a :href="torrent.url">Opcion {{ index + 1 }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    elements: {
      type: [Array, Object],
    }
  }
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-container {
    max-width: 880px;
    width: 92%;
    border-radius: 5px;
    background: #ffffff;
    position: relative;

    .modal-panel {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-direction: row;
      width: 100%;
      .poster-movie {
        img {
          width: 380px;
          box-sizing: border-box;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          display: block;
        }
      }

      .decription-movie {
        max-height: 520px;
        overflow-y: scroll;
        padding: 20px;
        p {
          line-height: 22px;
          font-size: 14px;
        }

        .lists-reset {
          h4 {
            font-size: 16px;
            color: #c7a733;
            padding-top: 10px;
            border-top: dotted 1px #e2e2e2;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }
        }

        .panel-ficha {
          ul li {
            font-size: 14px;
          }
        }

        .panel-genero {
          ul {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: row;
            li {
              background-color: #c7a733;
              border-radius: 50px;
              padding: 5px 10px;
              font-size: 12px;
              color: #ffffff;
              margin-right: 5px;
            }
          }
        }

        .panel-torrents {
          ul {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            flex-direction: row;
            li {
              font-size: 12px;
              margin-right: 12px;
              background-color: transparent;
              border-radius: 50px;
              border: solid 1px #c7a733;
              a {
                text-decoration: none;
                color: #c7a733;
                display: block;
                padding: 8px 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>