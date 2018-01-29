<template>
  <div class="input-group search">
    <div class="input-group-addon"><i class="fa fa-search" aria-hidden="true"></i></div>
    <input type="text" class="form-control" v-model="search" :placeholder="msg" @change="updateFilteredList"/>
  </div>
</template>

<script>
  export default {
    name: 'search-field',
    props: {
      list: {
        required: true,
        default: function () {
          return {}
        }
      },
      msg: {
        default: 'Entrer votre recherche'
      },
      searchName: 'delegate'
    },
    data () {
      return {
        search: '',
        filteredList: {},
        keys: ['displayName']
      }
    },
    methods: {
      matchWithSearch (object) {
        var res = false
        this.keys.forEach(k => {
          if (object.k.toLowerCase().includes(this.search.toLowerCase())) res = true
        })
        return res
      },
      updateFilteredList () {
        this.filteredList = this.list.filter(element => {
          this.matchWithSearch(element)
        })
        this.$emit('update' + this.searchName, this.filteredList)
      }
    }
  }
</script>

<style scoped>
  .search{
    width: 50%;
    margin-left: auto;
    margin-right: auto
  }
</style>
