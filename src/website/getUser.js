function getUser(authToken) {
    return new Promise((resolve, reject) => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        const parsedToken = JSON.parse(storedToken);

        const url = 'https://readit1-1f9246305140.herokuapp.com/username/';
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Token ${parsedToken}`
        };
        const requestOptions = {
          method: 'GET',
          headers: headers,
        };

        fetch(url, requestOptions)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        console.log('No authentication token found. No user logged in.');
        reject('No authentication token found.');
      }
    });
  }

  export default getUser;
