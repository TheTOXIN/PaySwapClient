<template>
  <v-container>
    <v-layout row>
      <v-flex xs12> 
        <h1>Add new</h1>
        <v-form ref="form" v-model="valid" lazy-validation> 
              <v-stepper v-model="e6"
              vertical
              :non-linear="nonLinear"
              light
              
              >
              <v-stepper-step editable :complete="e6 > 1" step="1" color="black">
                Input your acquiring
                <small>Or other expenses</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <v-flex xs12 sm6 md3>
                  <v-text-field
                    
                    :rules="[v => !!v || 'Must be required']"
                    required
                    type="text"
                    color="grey"
                    label="name"
                    placeholder="Mango"
                    prepend-icon="fiber_smart_record"
                    v-model="acquiring"
                  ></v-text-field>
                  <v-btn color="grey" @click="e6 = 2">Continue</v-btn>
                </v-flex>

                
              </v-stepper-content>

              <v-stepper-step dark editable :complete="e6 > 2" step="2" color="black">Price</v-stepper-step>

              <v-stepper-content  step="2" >
                <v-flex xs12 sm6 md3>
                      <v-text-field
                        type="text"
                        :rules="priceRules"
                        v-model="price"
                        required
                        color="grey"
                        label="price in RUB"
                        light
                        placeholder="100000"
                        prepend-icon="fiber_smart_record"
                        
                      ></v-text-field>
                      <v-btn color="grey" @click="e6 = 3">Continue</v-btn>
                    </v-flex>

              </v-stepper-content>

              <v-stepper-step editable :complete="e6 > 3" step="3" color="black">Date</v-stepper-step>

              <v-stepper-content step="3" >
              
                <div>
                  <v-date-picker 
                  dark
                  
                  v-model="picker" 
                  :landscape="landscape" 
                 >
                  </v-date-picker>
               </div>
                <v-btn color="grey" @click="e6 = 4">Continue</v-btn>
                
              </v-stepper-content>

              <v-stepper-step editable step="4" color="black">Kind</v-stepper-step>
              <v-stepper-content step="4">
                <v-flex xs12 sm6 d-flex>
                  <v-select
                    color="black"
                    :items="items"
                    :rules="[v => !!v]"
                    box
                    required 
                    v-model="selectItem"
                    label="Choose the type"
                  ></v-select>
                </v-flex>
                <v-btn
                 :disabled="!valid || loading"
                 :loading="loading"
                 class="white"
                 
                 @click="onSubmit">Submit</v-btn>
                
              </v-stepper-content>
            </v-stepper>
            </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      e6: 1,
      valid: false,
      items: ['Dues', 'Entertainment', 'Goods', 'Other'],
      picker: null,
      landscape: false,
      nonLinear: true,

      acquiring: '',
      price: '',
      picker: null,
      selectItem: null,
      

      priceRules: 
        [v => /^\d+$/.test(v) || 'You must use only numbers'],
      
    }
  },
  methods: { 
    iconTransfer (icon){
      if( icon == 'Dues'){
        icon = 'shopping_cart'
      } else if( icon == 'Entertaiment'){
          icon = 'account_balance'
      }else if( icon == 'Goods'){
          icon = 'shopping_basket'
      }else {
          icon = 'donut_large'
      }
      return icon
    },
    onSubmit () {    
      if (this.$refs.form.validate()) {
        const newSpend = {
          subject: this.acquiring,
          cost: this.price,
          dateOfCost: this.picker,
          icon: this.iconTransfer(this.selectItem)
        }
        //console.log( 'eeee boy', newSpend)
        this.$store.dispatch('createNewSpend', newSpend)
          .then(() => this.$router.push('/'))
          .catch(()=> {} )
      } 
      
    }
  },
  computed: {
      loading () {
      //return this.$store.getters.loading
    }
  }
}
</script>
