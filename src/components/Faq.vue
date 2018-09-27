<template>
<div id="about">
  
 <v-jumbotron
     class=""
    :gradient="gradient"
     dark
     height="50vh"
  
  >
    <v-container fill-height>
      <v-layout align-center column>
        <v-flex text-xs-center mt-5 pb-1>
          <h3 class="display-3">Welcome</h3>
        </v-flex>

         <v-flex text-xs-center>
             <v-btn :to="'/'">Getting started</v-btn>
        </v-flex>
       
      </v-layout>
    </v-container>
  </v-jumbotron>
<v-container fluid id="about__text">
  <v-layout>
    <v-flex class="text">
      <p class="display-1"> This is the implementation of mini bookkeeping at <a class="redColor" href="https://github.com/vuejs/vue">Vue.js.</a> In order to get started, you must log in or register.</p>
   <p class="display-1">The program code can be viewed at <a class="redColor" href="https://github.com/Hakoba/Bookkeeping">Github</a></p>
    </v-flex>
  </v-layout>
</v-container>
 
 </div>
</template>

<script>
export default {
  data () {
      return{
            
            gradient: 'to top, rgba(112, 115, 119, 0), rgba(112, 115, 119,.9)',
            link: '/'
      }
  },
  
  
}
</script>

<style scoped>

#about {
 min-height: 100%;
 background-image: url('../assets/bg_about.jpeg');
 background-size: cover;
 background-position: center; 
 position: relative;
}
ul{
  background: linear-gradient(to left, rgba(116, 110, 110, 0.459),rgba(116, 110, 110, 0));
}
li{
  list-style: none;
  display: inline;
  padding: 0 1rem;
  text-transform: uppercase;
 
}
li:hover{
  color: #eee;
  cursor: pointer;

}
#about__text{
  position: absolute;
 background: linear-gradient(to bottom, rgba(112, 115, 119, .02), rgba(112, 115, 119,1));
   padding: 0;
   padding-top: 5vh;
   bottom: 0;
}

.text{
padding: 10px;
  color: white;
}
.redColor{
  color: rgba(148, 50, 50, 0.986);
  text-decoration: none;
  font-size: 1.2em;
}
.redColor:hover{
  color: rgba(90, 30, 30, 0.986);
}
@media screen and (max-width: 700px){
  #about__text{
    display: none;
    transition: all 0.3s;
  }
}
</style>

