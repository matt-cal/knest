<script setup lang="ts">
import { ref } from "vue";
import MapAreaComponent from "../components/Area/MapAreaComponent.vue";
import AreaPolygons from '../AreaPolygons.json';



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
      <MapAreaComponent :paths="AreaPolygons.backBay" :areaTitle="'Back Bay'" />
      <MapAreaComponent :paths="AreaPolygons.beaconHill" :areaTitle="'Beacon Hill'" />
      <MapAreaComponent :paths="AreaPolygons.westEnd" :areaTitle="'West End'" />
      <MapAreaComponent :paths="AreaPolygons.northEnd" :areaTitle="'North End'" />
      <MapAreaComponent :paths="AreaPolygons.bayVillage" :areaTitle="'Bay Village'" />
      <MapAreaComponent :paths="AreaPolygons.charlestown" :areaTitle="'Charlestown'" />
      <MapAreaComponent :paths="AreaPolygons.eastBoston" :areaTitle="'East Boston'" />
      <MapAreaComponent :paths="AreaPolygons.southBoston" :areaTitle="'South Boston'" />
      <MapAreaComponent :paths="AreaPolygons.waterfront" :areaTitle="'Waterfront'" />
      <MapAreaComponent :paths="AreaPolygons.fenwayKenmore" :areaTitle="'Fenway Kenmore'" />
      <MapAreaComponent :paths="AreaPolygons.downtown" :areaTitle="'Downtown'" />
      <MapAreaComponent :paths="AreaPolygons.chinatown" :areaTitle="'Chinatown'" />
      <MapAreaComponent :paths="AreaPolygons.southEnd" :areaTitle="'South End'" />
      <MapAreaComponent :paths="AreaPolygons.missionHill" :areaTitle="'Mission Hill'" />
      <MapAreaComponent :paths="AreaPolygons.jamaicaPlain" :areaTitle="'Jamaica Plain'" />
      <MapAreaComponent :paths="AreaPolygons.roxbury" :areaTitle="'Roxbury'" />
      <MapAreaComponent :paths="AreaPolygons.mattapan" :areaTitle="'Mattapan'" />
      <MapAreaComponent :paths="AreaPolygons.dorchester" :areaTitle="'Dorchester'" />
      <MapAreaComponent :paths="AreaPolygons.allstonBrighton" :areaTitle="'Allston Brighton'" />
      <MapAreaComponent :paths="AreaPolygons.hydePark" :areaTitle="'Hyde Park'" />
      <MapAreaComponent :paths="AreaPolygons.westRoxbury" :areaTitle="'West Roxbury'" />
      <MapAreaComponent :paths="AreaPolygons.roslindale" :areaTitle="'Roslindale'" />
    </GMapMap>
  </main>
</template>