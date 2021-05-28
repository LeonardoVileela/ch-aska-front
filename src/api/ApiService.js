import AuthService from "./AuthService";
import axios from "axios";
import { API_ENDPOINT, AUTH_ENDPOINT, JWT_TOKEN_NAME } from "../constants";

class ApiService {

    //Clients
    listClients(onFetch, onError) {
        axios.get(`${API_ENDPOINT}/clients`, this.buildAuthHeader())
            .then(response => onFetch(response.data.content))
            .catch(e => onError(e));
    }

    saveClient(client, onSave, onError) {
        axios.post(`${API_ENDPOINT}/clients`, client, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }

    loadClient(id, onLoad, onError) {
        axios.get(`${API_ENDPOINT}/clients/${id}`, this.buildAuthHeader())
            .then(response => onLoad(response.data))
            .catch(e => onError(e));
    }

    putClient(id, client, onSave, onError) {
        axios.put(`${API_ENDPOINT}/clients/${id}`, client, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }
    

    //Sales
    listSales(onFetch, onError) {
        axios.get(`${API_ENDPOINT}/sales`, this.buildAuthHeader())
            .then(response => onFetch(response.data))
            .catch(e => onError(e));
    }

    deleteSale(id, onDelete, onError) {
        axios.delete(`${API_ENDPOINT}/sales/${id}`, this.buildAuthHeader())
            .then(() => onDelete())
            .catch(e => onError(e));
    }

    saveSale(sale, onSave, onError) {
        axios.post(`${API_ENDPOINT}/sales`, sale, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }
    //Sales

    //Products
    listProducts(onFetch, onError) {
        axios.get(`${API_ENDPOINT}/products`, this.buildAuthHeader())
            .then(response => onFetch(response.data.content))
            .catch(e => onError(e));
    }

    deleteProduct(id, onDelete, onError) {
        axios.delete(`${API_ENDPOINT}/products/${id}`, this.buildAuthHeader())
            .then(() => onDelete())
            .catch(e => onError(e));
    }

    loadProduct(id, onLoad, onError) {
        axios.get(`${API_ENDPOINT}/products/${id}`, this.buildAuthHeader())
            .then(response => onLoad(response.data))
            .catch(e => onError(e));
    }

    saveProduct(product, onSave, onError) {
        axios.post(`${API_ENDPOINT}/products`, product, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }

    putProduct(id, products, onSave, onError) {
        axios.put(`${API_ENDPOINT}/products/${id}`, products, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }
    //Products

    //Employees
    listEmployees(onFetch, onError) {
        axios.get(`${API_ENDPOINT}/appUsers`, this.buildAuthHeader())
            .then(response => onFetch(response.data.content))
            .catch(e => onError(e));
    }

    deleteEmployee(id, onDelete, onError) {
        axios.delete(`${API_ENDPOINT}/appUsers/${id}`, this.buildAuthHeader())
            .then(() => onDelete())
            .catch(e => onError(e));
    }

    saveEmployee(appUser, onSave, onError) {

        axios.post(`${AUTH_ENDPOINT}/cadaster`, appUser, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }
    putEmployeeAdmin(id, admin, onSave, onError) {
        axios.put(`${AUTH_ENDPOINT}/admin/${id}`, admin, this.buildAuthHeader())
            .then(() => onSave())
            .catch(e => onError(e));

    }
    //Employees

    getJWTTokenData() {
        const jwtToken = this.getJWTToken();
        if(jwtToken == null) {
            return null;
        }

        const jwtTokenData = atob(jwtToken.split(".")[1])
        return JSON.parse(jwtTokenData);
    }
    getJWTToken() {
        return sessionStorage.getItem(JWT_TOKEN_NAME);
    }

    load(id, onLoad, onError) {
        axios.get(`${API_ENDPOINT}/tasks/${id}`, this.buildAuthHeader())
            .then(response => onLoad(response.data))
            .catch(e => onError(e));
    }

    save(task, onSave, onError) {
        if (task.id === 0) {
            axios.post(`${API_ENDPOINT}/tasks`, task, this.buildAuthHeader())
                .then(() => onSave())
                .catch(e => onError(e));

        } else {
            axios.put(`${API_ENDPOINT}/tasks/${task.id}`, task, this.buildAuthHeader())
                .then(() => onSave())
                .catch(e => onError(e));
        }
    }

    buildAuthHeader() {
        return {
            headers: {
                'Authorization': `Bearer ${AuthService.getJWTToken()}`
            }
        }
    }
}

export default new ApiService();