<script setup lang="ts">
import { ref } from "vue";
import MapAreaComponent from "../components/Area/MapAreaComponent.vue";

interface location {
  lng: number;
  lat: number;
}

const loc = ref<location>({ lat: 42.361145, lng: -71.057083 });

function setPlace(data: any) {
  loc.value.lat = data.geometry.location.lat();
  loc.value.lng = data.geometry.location.lng();
}
</script>

<template>
  <main>
    <GMapAutocomplete placeholder="Pick a Location" @place_changed="setPlace"> </GMapAutocomplete>
    <GMapMap :center="loc" :zoom="13" style="left: 5vw; width: 90vw; height: 70vh">
      <MapAreaComponent :paths="path1" :areaTitle="'Back Bay'" />
      <GMapPolygon :paths="path2" />
      <GMapPolygon :paths="path3" />
    </GMapMap>
  </main>
</template>
<script lang="ts">
export default {
  name: "App",
  data() {
    return {
      center: { lat: 42.361145, lng: -71.057083 },
      path1: [
        { lat: 42.35146635260653, lng: -71.08953996216785 },
        { lat: 42.34888148085609, lng: -71.0883812479256 },
        { lat: 42.352343761013344, lng: -71.07597643883452 },
        { lat: 42.35498353414136, lng: -71.07731597108398 },
      ],
      path2: [
        { lat: 42.356012239300824, lng: -71.07334990457454 },
        { lat: 42.35834132071458, lng: -71.06631079375042 },
        { lat: 42.35715738180001, lng: -71.06581175232415 },
        { lat: 42.35770083194016, lng: -71.06329027985457 },
        { lat: 42.35548818412677, lng: -71.06045362332628 },
        { lat: 42.35240199259908, lng: -71.06263364639895 },
        { lat: 42.350985011135805, lng: -71.07093349327799 },
      ],
      path3: [
        { lat: 42.35496412455133, lng: -71.07727657282537 },
        { lat: 42.35607046743637, lng: -71.07341556804846 },
        { lat: 42.350887956446336, lng: -71.07098602427035 },
        { lat: 42.349897989990225, lng: -71.07472883499395 },
      ],
      options: {
        strokeColor: "#FF0006",
        strokeOpacity: 0.2,
        strokeWeight: 3,
        fillColor: "#FF0000",
        fillOpacity: 0.2,
      },
    };
  },
};
</script>
