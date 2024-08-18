<template>
  <form autocomplete="off" @submit.prevent="onSubmit">
    <!-- vykreslit všechny kontrolky -->
     <!-- <template v-for="control in controls" :key="control">
      <div>
        <label :for="control">{{ settings[control].label }}</label>

        <select v-if="settings[control].type === 'select'" :id="control" v-model="formData[control]">
          <option value=""></option>
          <option v-for="option in settings[control].options" :value="option.value">{{ option.label }}</option>
        </select>

        <textarea v-else-if="settings[control].type === 'textarea'" :id="control" v-model="formData[control]"></textarea>

        <input v-else :type="settings[control].type" :id="control" v-model="formData[control]">

      </div>
     </template> -->
     <TControl v-for="control in controls" :formName="formName" :control="control" @changed="onChanged"/>
     <div>
      <button>submit</button>
     </div>
  </form>
</template>

<script>
import TControl from './TControl.vue'
export default {
  props: {
    formName: String
  },
  data () {
    return {
      formData: {}
    }
  },
  created () {
    this.controls.forEach((control) => {
      this.formData[control] = this.settings[control].initialValue || ''
    })
  },
  computed: {
    settings () {
      return this.$store.state.formSettings[this.formName]
    },
    controls () {
      return Object.keys(this.settings) //['first', 'last', 'positionid']  ['project', 'description']
    }
  },
  methods: {
    onSubmit() {
      // validace ??????
      // když je vše ok:
      this.$emit('submited', this.formData)
    },
    onChanged(payload) {
      this.formData[payload.control] = payload.value
    }
  },
  components: { TControl }
}

</script>