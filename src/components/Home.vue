<template>
<div>
  <v-container>
    <v-layout row align-center>
      <v-flex xs12> 
        <v-card class="elevation-6">
         <v-tabs
      v-model="active"
      color="black"
      dark
      fixed-tabs
      slider-color="yellow"
    >
      <v-tab @click="toDay">
      <span >
        {{periods[0]}}
      </span>
      </v-tab>
    <v-tab @click="toWeek">
       <span >
        {{periods[1]}}
      
      </span>
      </v-tab>
      <v-tab @click="toMonth">
       <span >
        {{periods[2]}}
      </span>
      </v-tab>
      <v-tab @click="toYear">
      
       <span >
        {{periods[3]}}
      </span>
      </v-tab>
      <v-tab-item
        v-for="n in 4"
        :key="n"
      >
    <v-data-table
          hide-actions
          class="elevation-1"
          :items="costs"
          :headers="headers"
          
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">{{ props.item.subject }}</td>
            <td class="text-xs-center">{{ props.item.cost }} RUB</td>
            <td class="text-xs-center">{{ props.item.dateOfCost }}</td>
            <td class="text-xs-center"><v-icon>{{props.item.icon}}</v-icon></td>
            <!-- <td class="text-xs-center"><v-btn color="grey" dark @click="onDelete">Delete</v-btn></td> -->

          </template>
          <template slot="no-data" v-show="">
            <v-alert :value="true" color="error" icon="warning">
              You need to add ur costs! 
            </v-alert>
          </template>
  </v-data-table>
      </v-tab-item>
    </v-tabs>

    
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container>
  <v-card> <p pt3> Code to invite: 555677fff </p> </v-card>
</v-container>
</div>

</template>

<script>
export default {
  data () {
    return {
      active: null,
      today: new Date().toISOString().slice(0,10) ,
      periods: ['Day', 'Week', 'Month', 'All time'],
      headers: [
          { text: 'Subject', value: 'subject', align: 'center'},
          { text: 'Cost', value: 'cost', align: 'center'},
          { text: 'Date', value: 'date', align: 'center', sortable: false},
          { text: 'Kind', value: 'kind', align: 'center', sortable: false},
          // { text: 'Actions', value: 'actions', align: 'center', sortable: false}
        ]
       }
    },
  computed: {
   costs () {
     return this.$store.getters.costs
   }  
  },
  methods: {
    onDelete(){
        console.log(this.costs.subject)
       //this.$store.dispatch('deleteCost', )
    },
      
      
     async toDay (){
        await this.$store.dispatch('fetchCosts')
  this.$store.dispatch('setLoading', false)
        for( let item in this.costs){
          if(this.costs[item].dateOfCost != this.today){
            this.costs.splice(item,1, 'kek')
          }
        }
        
       this.$store.commit('costsFilter')
        
      }, 

      parseToInt (str){ 
        return parseInt(str.split("-").join(""), 10)
      },
      async toPeriod(num){      // где num это колличество дней показывающих в каком промежутке искать (7 неделя, 30 месяц и тд)
        let today = this.parseToInt(this.today)
         await this.$store.dispatch('fetchCosts')
         console.log(today)
           this.$store.dispatch('setLoading', false)
           for( let item in this.costs){
          let date = this.parseToInt(this.costs[item].dateOfCost)
          if(today - date >= num){
            this.costs.splice(item,1, 'kek')
          }
        }
        this.$store.commit('costsFilter') //надо в мутэйшенсе прописывать, кек
      },
      toWeek () {
        this.toPeriod(7)
      },
      toMonth () {
        this.toPeriod(30)
      },
      toYear () {
        this.toPeriod(365)
      }
  },
  beforeCreate () {

    this.$store.dispatch('fetchCosts')
    //
  },
  destroyed (){
    this.$store.dispatch('setLoading', false)
  }
}
</script>
