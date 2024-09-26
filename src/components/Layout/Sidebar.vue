<template>
<div class="my-5">
   

    <v-list nav active-class="my-selected-item" >
        <v-list-item v-for="([title, icon,path], i) in dashboard" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title"></v-list-item>
        <v-list-group value="Reports" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-file-chart-outline" title="Reports"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon,path], i) in Report" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title"></v-list-item>
        </v-list-group>
        <v-list-group value="Settings" append-icon="mdi-menu-right">
            <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" link prepend-icon="mdi-wrench" title="Settings"></v-list-item>
            </template>
            <v-list-item v-for="([title, icon,path], i) in Settings" :key="i" :title="title" :prepend-icon="icon" router :to="path" :value="title"></v-list-item>
        </v-list-group>
    </v-list>
</div>
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            rail: false,
            dashboard: [
                ['Dashboard', 'mdi-rounded-square', '/dashboard'],
            ],
          
            singleItem: [
                ['Website Scrapes', 'mdi-web', '/profile-list'],
                ['API Scrape', 'mdi-api', '/profile-list'],
                ['Schedules', 'mdi-calendar-month', '/profile-list'],
                ['Analysis', 'mdi-google-analytics', '/profile-list'],
            ],
            Report: [
                ['Report', 'mdi-twitter', '/profile-list'],
            ],
            Settings: [
                ['Settings', 'mdi-wrench', '/profile-list'],
            ],
        }
    },
}
</script>

<style >
.my-selected-item {
    background-color:  #A82228;
    /* Set your desired background color */
    color: #ffffff;
    /* Set your desired text color */
}

.default-color {
  color:  #A82228; /* Set your desired default text color */
}
</style>
