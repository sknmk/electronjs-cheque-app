<template>
  <div class="container-fluid notification-container">
    <div class="row d-flex flex-column">
      <div
        :class="'offset-8 col-4 mb-2 notification-item ' + notification.type"
        v-for="(notification, index) in getNotificationStore"
        :key="notification.id"
      >
        <div class="row px-3">
          <div class="col-8 bold">
            <i :class="notification.icon + ' mr-1'"></i>
            {{notification.header}}
          </div>
          <div class="col-4 text-right">
            <i class="ri-close-line" @click="deleteItem(index)"></i>
          </div>
          <div class="col-12 py-3">{{notification.message}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.notification-container {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
    z-index: 999;
}
.notification-item {
  padding: 1rem;
  z-index: 999;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.2rem;
}
.ri-close-line {
  cursor: pointer;
}
</style>
<script type="application/javascript">
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["getNotificationStore"])
  },
  methods: {
    ...mapActions(["deleteNotification"]),

    deleteItem(index) {
      this.deleteNotification(index);
    }
  }
};
</script>