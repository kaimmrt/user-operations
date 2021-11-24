import Axios from "./Axios";

let task;

export async function post(adres, params = null) {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            task = Axios.post(adres, params);
            resolve(
                task
                    .then(({ data }) => {
                        try {
                            data = JSON.parse(data);
                        } catch { }
                        return data;
                    })
                    .catch((err) => {
                        //IStore.setConnection(1);
                        return { result: false, error: 1 };
                    })
            );
        }, 1000);
    });
}

export async function get(adres, log = false) {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            task = Axios.get(adres);
            resolve(
                task.then(({ data }) => {
                    if (log == true)
                        console.log(data)
                    try { data = JSON.parse(data) } catch { }
                    return data;
                }).catch((err) => {
                    return { result: false, error: 1 };
                })
            )
        }, 1000)
    })
}


export async function put(adres, params = null) {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            task = Axios.put(adres, params);
            resolve(
                task.then(({ data }) => {
                    try { data = JSON.parse(data) } catch { }
                    return data;
                }).catch((err) => {
                    return { result: false, error: 1 };
                })
            )
        }, 1000);
    });
}

export async function remove(adres, params = null) {

    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            task = Axios.delete(adres, params);
            resolve(
                task.then(({ data }) => {
                    try { data = JSON.parse(data) } catch { }
                    return data;
                }).catch((err) => {
                    return { result: false, error: 1 };
                })
            )
        }, 1000);
    });
}

export function getURL() {
    return "https://619c9e5368ebaa001753c99b.mockapi.io/";
}

// export function getUser(token) {
//     try {
//         if (token) {
//             return jwt_decode(token);
//         } else {
//             return jwt_decode(localStorage.getItem("token"));
//         }
//     } catch (e) { }
//     return {};
// }
