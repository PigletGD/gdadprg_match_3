const BASE_URL = "http://localhost:3000/users/"

class UserApi {

    static async CreateUser(new_user) {
        return BackendRequest.Post(`${BASE_URL}`, { user: new_user })
            .then((resp) => {
                console.log(resp);
                return resp.body.user;
            }).catch(e => {
                console.log(e);
            });
    }

    static async PatchUser(id, changes) {
        return BackendRequest.Patch(`${BASE_URL}${id}`, { user: changes })
    }

    static async UpdateUser(id, updates) {
        return BackendRequest.Put(`${BASE_URL}${id}`, { user: updates })
            .then((resp) => {
                return resp.body.user;
            })
    }

    static async GetUser(id) {
        return BackendRequest.Get(`${BASE_URL}${id}`)
            .then((resp) => {
                return resp.body.user;
            })
    }

    static async DeleteUser(id) {
        return BackendRequest.Delete(`${BASE_URL}${id}`)
    }

    static async GetAllUsers() {
        return BackendRequest.Get(`${BASE_URL}`)
            .then((resp) => {
                return resp.body;
            }).catch(e => {
                console.log(e);
            });
    }
}