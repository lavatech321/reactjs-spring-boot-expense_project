import axios from "axios";

const APP_URL = "http://localhost:8070/api/v1/expense";

class ExpenseService {

    getAllExpenses() {
        return axios.get(APP_URL);
    }

    viewExpense(id) {
        return axios.get(`${APP_URL}/${id}`);
    }

    deleteExpense(id) {
        return axios.delete(`${APP_URL}/${id}`);
    }

    createExpense(expense) {
        return axios.post(APP_URL, expense);
    }

    updateExpense(id, expense) {
        return axios.put(`${APP_URL}/${id}`, expense);
    }

    deleteAllExpenses() {
        return axios.delete(`${APP_URL}`);
    }
}

// eslint-disable-next-line
export default new ExpenseService();