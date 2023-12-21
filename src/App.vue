<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

  <template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Holdem Suite Review
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/">Home</q-route-tab>
        <q-route-tab to="/browse">Browse</q-route-tab>
        <q-route-tab to="/about">About</q-route-tab>
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>


  </q-layout>
</template>

<style scoped>

</style>
