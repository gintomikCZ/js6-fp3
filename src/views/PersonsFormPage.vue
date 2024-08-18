<template>
  <h1>Persons Form</h1>
  <!-- <form autocomplete="off">
    <div>
      <label for="first">first name</label>
      <input type="text" id="first" v-model="first">
      <transition name="fade-in-out">
      <div class="help-message">hint</div>
      </transition>
    </div>
    <div>
      <label for="last">last name</label>
      <input type="text" id="last" v-model="last">
    </div>
    <div>
      <label for="positionid">position</label>
      <select id="positionid" v-model="positionid"></select>
    </div>
  </form> -->
  <TForm formName="persons" v-if="!loading" @submited="onSubmited"/>
</template>
<script>
  import TForm from '../components/TForm.vue'
  import db from '../utils/db.js'
  export default {
    computed: {
      isEdit () {
        return !!this.$route.params.id
      }
    },
    data () {
      return {
        loading: true
      }
    },
    created () {
      const promises = [
        db.get('js6positions').then((data) => { // [{id: 8, position: 'manažer'}]
          this.$store.commit('setOptions', {
            formName: 'persons',
            control: 'positionid',
            options: data.map(record => ({ value: record.id, label: record.position }))
          })
        })
      ]

      if (this.isEdit) {
        promises.push(
          db.get('js6persons/' + this.$route.params.id).then(record => {
            this.$store.commit('setInitialValues', {
              formName: 'persons',
              values: record
            })
          })
        )
      }
      Promise.all(promises).then(() => {
        this.loading = false
      })

    },
    methods: {
      onSubmited (formData) {
        const promise = this.isEdit
          ? db.put('js6persons', Object.assign({id: this.$route.params.id}, formData))
          : db.post('js6persons', formData)
        promise.then(() => {
          this.$router.push('/')
        })
      }
    },
    components: { TForm }
  }



</script>