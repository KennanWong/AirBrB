
export const apiFetch = (method, route, TOKEN, body) => {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: null,
    };

    if (method !== 'GET') {
        requestOptions.body = JSON.stringify(body);
    }

    if (TOKEN !== null) {
        requestOptions.headers.Authorization = `Bearer ${TOKEN}`;
    } else {
        console.log('empty token')
    }

    return new Promise((resolve, reject) => {
        fetch(`http://localhost:5005${route}`, requestOptions)
            .then((response) => {
                switch (response.status) {
                case 200:
                    response.json().then((data) => {
                        resolve(data);
                    });
                    break;
                case 400 :
                    response.json().then((data) => {
                        reject(data.error);
                    });
                    break;
                case 403:
                    response.json().then((data) => {
                        reject(data.error);
                    });
                    break;
                }
            })
            .catch((response) => {
                console.log(response);
                response.json().then((data) => {
                    resolve(data.error);
                });
            });
    });
};
