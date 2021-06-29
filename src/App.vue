<template>
  <div id="app">
    <section id="table" class="container">
      <div class="row mt-3 mb-3">
        <div class="col-6 offset-3">
          <Modal />
        </div>
      </div>
      <div class="row">
        <div class="col-6 offset-3">
          <Table />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Table from '@/components/table.vue'
import Modal from '@/components/modal.vue'

export default {
  name: 'App',
  components: {
    Table,
    Modal,
  }
};
</script>

<style>
@import "./assets/bootstrap/bootstrap-reboot.min.css";
@import "./assets/bootstrap/bootstrap.min.css";
</style>
