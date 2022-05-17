const { createApp } = Vue

const app = createApp({
    data() {
        return {
            title: "Mr",
            firstName: "Jone",
            lastName: "Duo",
            gender: "male",
            email: "JoneDuo@gmail.com",
            img: "https://randomuser.me/api/portraits/men/75.jpg",
        }
    },
    methods: {
        getUser() {
            fetch("https://randomuser.me/api/")
                .then(response => response.json())
                .then(data => {
                    data = data.results[0];
                    console.log(data);
                    console.log(data.name.first);
                    this.title = data.name.title;
                    this.firstName = data.name.first;
                    this.lastName = data.name.last;
                    this.gender = data.gender;
                    this.email = data.email;
                    this.img = data.picture.large;
                })
        }
    }
});
app.mount('#app');