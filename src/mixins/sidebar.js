// import axios from 'axios';

export default {
    data() {
        return {
            drawer: true,
            darkTheme: true,
        };
    },
    methods: {
        toggleDrawer() {
            this.drawer = !this.drawer;
        },
    },
   
};