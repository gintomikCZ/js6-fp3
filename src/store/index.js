import { createStore } from 'vuex'
import formSettings from './formSettings.js'
import db from '../utils/db.js'
const store = createStore({
  state: {
    itWorks: 'itWorks',
    formSettings: formSettings,
    persons: []
  },
  mutations: {
    setOptions (state, payload) { // {formName: persons, control: positionid, options: [{label: '...', value 8}]}
      state.formSettings[payload.formName][payload.control].options = payload.options
    },
    setInitialValues (state, payload) { // {formName: persons, values: {first: 'Karel', last: 'Houska'}}
      Object.keys(state.formSettings[payload.formName]).forEach(control => {
        state.formSettings[payload.formName][control].initialValue = payload.values[control] || ''
      })
    },
    setPersons (state, data) {
      state.persons = data
    }
  },
  actions: {
    fetchPersons (context) {
      return db.get('js6persons').then(data  => {
        context.commit('setPersons', data)
      })
    }
  }
})

export default store