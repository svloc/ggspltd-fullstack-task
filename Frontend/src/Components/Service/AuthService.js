import { getAccessToken } from "../Storage/Storage";
const auth_url = "http://localhost:8080/api/auth";
const post_url = "http://localhost:8080/api/post";

class AuthService {
    static async postSignin(loginObj) {
        const response = await fetch(`${auth_url}/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginObj)
        });
        return response;
    }

    static async postSignup(regObj) {
        const response = await fetch(`${auth_url}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(regObj)
        });

        return response;
    }

    static async getSignout() {
        const response = await fetch(`${auth_url}/signout`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return await response.json();
    }

    static async getPostList() {
        const token = getAccessToken();
        const response = await fetch(`${post_url}/viewAll`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }

    static async deletePost(id) {
        const token = getAccessToken();
        const response = await fetch(`${post_url}/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }

    static async addPost(postObj) {
        const token = getAccessToken();
        const response = await fetch(`${post_url}/add`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        });
        return response;
    }

    static async getPostById(id) {
        const token = getAccessToken();
        const response = await fetch(`${post_url}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response;
    }


    static async updatePost(postObj) {
        const token = getAccessToken();
        const id = postObj.id;
        const response = await fetch(`${post_url}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postObj)
        });
        return response;
    }

}

export default AuthService;