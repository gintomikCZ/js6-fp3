<template>
  <h1>Tasks Form</h1>

  <TForm formName="tasks" v-if="!loading" @submited="onSubmited"/>
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
        db.get('js6projects').then((data) => { // [{id: 8, position: 'manažer'}]
          this.$store.commit('setOptions', {
            formName: 'tasks',
            control: 'projectid',
            options: data.map(record => ({ value: record.id, label: record.project }))
          })
        })
      ]

      if (this.isEdit) {
        promises.push(
          db.get('js6tasks/' + this.$route.params.id).then(record => {
            this.$store.commit('setInitialValues', {
              formName: 'tasks',
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
          ? db.put('js6tasks', Object.assign({id: this.$route.params.id}, formData))
          : db.post('js6tasks', formData)
        promise.then(() => {
          this.$router.push('/')
        })
      }
    },
    components: { TForm }
  }



</script>