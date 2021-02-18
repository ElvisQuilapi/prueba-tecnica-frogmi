import axios from 'axios'
import { URI_API } from '@/services/index'

const state = {
    movies: [],
    loading: false
}

const getters = {
    statusLoading: (state) => state.loading,
    allMovies: (state) => state.movies
}

const actions = {
    async loadMovies({ commit }, element) {
        commit('setLoading', true);
        try {
            const response = await axios.get(`${URI_API}v2/list_movies.json?genre=${element.genero}&quality=${element.quality}`)
            const { movies } = response.data.data

            commit('setMovies', movies)
            commit('setLoading', false)
        } catch (error) {
            console.log(error)
        }
    },
}

const mutations = {
    setLoading: (state, value) => (state.loading = value),
    setMovies: (state, movies) => (state.movies = movies)
}

export default {
    state,
    actions,
    mutations,
    getters
}

