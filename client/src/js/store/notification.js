import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  notifications: [
    {
      header: "Uyarı",
      message: "Deneme yazısıdır.",
      type: "bg-danger text-white",
      icon: "ri-alarm-warning-line",
    },
  ],
};

const getters = {
  getNotificationStore(state) {
    return state.notifications;
  },
};

const mutations = {
  setNotification(state, notification) {
    state.notifications.push(notification);
  },
  unsetNotification(state, notificationId) {
    state.notifications.splice(notificationId, 1);
  },
};

const actions = {
  appendNotification({ commit }, notification) {
    commit("setNotification", notification);
  },
  deleteNotification({ commit }, notificationId) {
     commit("unsetNotification", notificationId)
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
