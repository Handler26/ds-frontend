import axios from 'axios';
import authHeader from './auth-header';


const API_URL = 'http://localhost:8080/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getApplications() {
        return axios.get(API_URL + 'applications' , { headers: authHeader() });
    }
    getAllApplications() {
        return axios.get(API_URL + 'applications/all' , { headers: authHeader() });
    }
    newApplication(application) {
        return axios.post(API_URL + 'applications/create' ,{ 
            bachelorDegreeTitle: application.bachelorDegreeTitle,
            bachelorDegreeGrade: application.bachelorDegreeGrade,
            teachers: application.teachers,
            mastername: application.mastername,
        } , { headers: authHeader()})
    }
    updateApplication(application) {
        return axios.put(API_URL + 'applications/update/' + application.id ,{ 
            bachelorDegreeTitle: application.bachelorDegreeTitle,
            bachelorDegreeGrade: application.bachelorDegreeGrade,
            teachers: application.teachers,
            priority_number: application.priority_number,
            mastername: application.mastername,
            id: application.id,
            setAcceptedbySecretary: false,
            setAcceptedbyTeacher: true
        } , { headers: authHeader()})
    }


    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }
}

export default new UserService();
