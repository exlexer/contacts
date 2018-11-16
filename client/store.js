import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [],
    open: [],
    active: 'home',
  },

  mutations: {
    UPDATE_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },

    NAVIGATE(state, index) {
      state.active = index;
    },

    OPEN_CONTACT(state, contact) {
      const { id } = contact;
      if (!state.open.filter(c => c.id === id).length) {
        state.open.push(contact);
        state.active = id.toString();
      }
    },

    CLOSE_CONTACT(state, val) {
      let i;
      if (val.id) {
        i = state.open.map(c => +c.id).indexOf(+val.id);
      } else {
        i = +val;
      }
      state.open.splice(i, 1);
      state.active = 'home';
    },
  },

  actions: {
    getContacts({ commit }) {
      const promise = api.get('contacts');

      promise
        .then(({ data }) => {
          commit('UPDATE_CONTACTS', data);
        });

      return promise;
    },

    createObject({ dispatch }, { type, id, data }) {
      const url = type === 'contacts' ? 'contacts' : `contacts/${id}/${type}`;
      const promise = api.post(url, data);

      promise
        .then(() => {
          dispatch('getContacts');
        });

      return promise;
    },

    updateObject({ dispatch }, { type, id, data }) {
      const url = `${type}/${id}`;
      const promise = api.patch(url, data);

      promise
        .then(() => {
          dispatch('getContacts');
        });

      return promise;
    },

    deleteObject({ commit, dispatch }, { type, id }) {
      api.delete(`${type}/${id}`)
        .then(() => {
          dispatch('getContacts');
          if (type === 'contacts') commit('CLOSE_CONTACT', { id });
        });
    },
  },
});
