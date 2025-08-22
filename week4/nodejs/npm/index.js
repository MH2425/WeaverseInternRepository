import axios from 'axios';

axios.get('https://api.github.com/users/octocat')
  .then(response => {
    console.log("Username:", response.data.login);
    console.log("Bio:", response.data.bio);
  })
  .catch(error => {
    console.error("Error fetching data:", error.message);
  });