<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-img id="logo" src="assets/kusama.svg"></ion-img>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Blank</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <form class="ion-padding" @submit.prevent="submitForm">
          <div class="column" style="margin: 5rem;">
            <label for="council-address">Enter your Council Address...</label>
            <input id="council-address" />
          </div>
        </form>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  data() {
    return {
      address: ""
    };
  },
  methods: {
    submitForm() {
      this.$store.dispatch('addAddress', this.address);
    },
  }
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

#logo {
  width: 20rem;
  margin: 1rem;
}

@media screen and (max-width: 667px)  {
  #logo {
    width: 30rem;
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;  
  }
}
</style>