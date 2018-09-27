import * as fb from 'firebase'
import './auth'
class Costs { 
  constructor(dateOfCost , cost, subject, icon, ownerID, id){
this.dateOfCost = dateOfCost
this.cost = cost
this.subject = subject
this.icon = icon
this.ownerID = ownerID

  }
}
export default {
  state: {
    costs: [
    ]
  },
  mutations: {
    costsFilter (state) { 
      state.costs = state.costs.filter( item => item != 'kek' )
    },
    createNewSpend (state, payload){
      state.costs.push(payload)
    },
    loadCosts (state, payload){
      state.costs =payload
    },
    updateCosts(state, payload){
    //  state.costs.find
    }
  },
  actions: {
    async  createNewSpend({commit, getters}, payload){
      //console.log(payload,' lolol')
      commit('clearError')
      commit('setLoading', true)
      try{
        const newCost = new Costs(payload.dateOfCost, payload.cost, payload.subject, payload.icon, getters.user.id)
        const cost = await fb.database().ref('costs').push(newCost)
        commit('setLoading', false)
        commit('createNewSpend',{
          ...newCost,
          id: cost.key
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
      //commit('createNewSpend', payload)
    },
  async fetchCosts ({commit, getters}){
    console.log(getters.user)
    commit('clearError')
    commit('setLoading', true)
    const resultCosts = []
    try{
     const fbVal= await  fb.database().ref('costs').once('value')
     const costs =  fbVal.val()
     Object.keys(costs).forEach(key => {
       const cost = costs[key]
       if(cost.ownerID == getters.user.id){
         
       resultCosts.push(
         new Costs(cost.dateOfCost, cost.cost, cost.subject, cost.icon, cost.ownerID, key)
       )}
       //console.log(key)
     })
     commit('loadCosts', resultCosts)
     console.log(costs)
    } catch (error){
      commit('setError', error.message)
      commit('setLoading', false)
      throw error
    }
  },
  async deleteCoct ({commit}, {id}){
    commit('clearError')
    commit('setLoading', true)
    
    try{
     const fbVal= await  fb.database().ref('costs').child(id).remove()
      console.log(fbVal)
  
    // commit('updateCosts', fbVal)
     //console.log(costs)
    } catch (error){
      commit('setError', error.message)
      commit('setLoading', false)
      throw error
    }
  }
 
  },
  getters: {
   
    costs (state) {
      return state.costs;
    }
  }

}