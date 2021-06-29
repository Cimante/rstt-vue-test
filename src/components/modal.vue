<template>
  <div id="modal-container">
    <button class="btn btn-sm btn-primary" @click="isModalShow = true">Добавить</button>
    <div class="modal__mask" v-if="isModalShow">
      <div class="modal__wrapper" @click.self="isModalShow = false">
        <section class="modal__content">
          <div class="d-flex justify-content-between align-items-center">
            <h5>Добавление пользователя</h5>
            <button @click="isModalShow = false" class="btn btn-sm btn-danger">&times;</button>
          </div>
          <form class="mt-3" @submit.prevent="sendUserData(), clearUserInputs(), isModalShow = false">
            <div class="mb-3">
              <label for="form-name" class="form-label form-label-sm">Имя:</label>
              <input id="form-name" type="text" class="form-control form-control-sm" required v-model.lazy="name" />
            </div>
            <div class="mb-3">
              <label for="form-phone" class="form-label form-label-sm">Телефон:</label>
              <input id="form-phone" type="text" class="form-control form-control-sm" required v-model.lazy="phone" />
            </div>
            <div class="mb-3">
              <label for="form-chief" class="form-label form-label-sm">Начальник:</label>
              <select name="form-chief" id="form-chief" class="form-select form-select-sm" v-model.lazy="chief">
                <option disabled value="0">Выберите один из вариантов</option>
                <option v-for="(user, idx) in users" :key="idx" :value="user.id">{{ user.name }} ({{ user.phone }})</option>
              </select>
            </div>
            <button type="submit" class="btn btn-sm btn-primary">Сохранить</button>
          </form>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  data() {
    return {
      isModalShow: false,
      name: '',
      phone: '',
      chief: null
    }
  },
  computed: {
    users() {
      return this.$store.getters.getTable
    }
  },
  methods: {
    sendUserData() {
      (this.chief) 
        ? this.$store.dispatch('sendUserData', { name: this.name, phone: this.phone, chief: this.chief })
        : this.$store.dispatch('sendUserData', { name: this.name, phone: this.phone })
    },
    clearUserInputs() {
      this.name = '',
      this.phone = '',
      this.chief = null
    },
    selectChanged(e) {
      console.log(e.target.value)
    }
  }
}
</script>

<style>
.modal__mask {
  position: fixed;
  display: table;
  z-index: 9000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
}

.modal__wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal__content {
  width: 540px;
  height: auto;
  margin: 0px auto;
  padding: 20px 30px 18px 30px;
  background-color: #fff;
  border-radius: 7px;
}

.form-label {
  margin-right: 12px;
}
</style>