<template>
  <table class="table table-hover table-sm">
    <thead>
      <tr>
        <th scope="col" v-for="(tableField, idx) in tableFields" :key="idx" @click="sortTable(tableField)">
          <span>{{ tableField }}</span>
          <span v-if="field === tableField && direction === 1">&nbsp;▼</span>
          <span v-if="field === tableField && direction === -1">&nbsp;▲</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(tableItem, idx) in tableData">
        <tr :key="idx">
          <td v-if="tableItem.subordinates">+ {{ tableItem.name }}</td>
          <td v-else>{{ tableItem.name }}</td>
          <td>{{ tableItem.phone }}</td>
        </tr>
        <tr v-for="(subs, idx) in tableItem.subordinates" :key="subs.name + idx" class="table__subordinate">
          <td>+ {{ subs.name }}</td>
          <td>{{ subs.phone }}</td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
  computed: {
    tableData() {
      return this.$store.getters.getTable
    }
  },
  data() {
    return {
      tableFields: ['Имя', 'Телефон'],
      field: '',
      direction: 1
    }
  },
  methods: {
    sortTable(sortField) {
      if (this.$store.state.table) {
        if (this.field === sortField) {
          this.direction *= -1
        } else {
          this.field = sortField
          this.direction = 1
        }
      this.$store.dispatch('sortTable', this.field)
      }
    }
  }
}
</script>

<style>
tr.table__subordinate > td {
  background-color: #f3f3f7;
}

tr.table__subordinate > td:first-child {
  padding-left: 1.5em;
}
</style>