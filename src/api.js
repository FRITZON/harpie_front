import axios from "axios";

// Récupération de l'utilisateur et de son token
const user = JSON.parse(localStorage.getItem('user'));
const token = user?.access || "";

// URL de base pour les requêtes API
const BASEURL = "https://harpie-app.site/api/v1";

// Fonction pour générer la configuration des en-têtes
const getConfig = (sessionId = null) => {
    const headers = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    if (sessionId) {
        headers["X-Session-ID"] = sessionId;
    }
    return { headers };
};

// Fonction générale pour faire des requêtes
const apiRequest = async (method, endpoint, data = null, sessionId = null) => {
    try {
        const config = getConfig(sessionId);
        const response = await axios({
            method,
            url: `${BASEURL}${endpoint}`,
            data,
            ...config,
        });
        return response.data; // Retourne seulement les données de la réponse
    } catch (error) {
        console.error(`${method.toUpperCase()} request error:`, error);
        throw error; // Rejeter l'erreur pour un traitement ultérieur
    }
};

// Fonctions spécifiques pour les requêtes API
export const getRequest = (endpoint) => apiRequest('get', endpoint);
export const postRequest = (endpoint, data) => apiRequest('post', endpoint, data);
export const deleteRequest = (endpoint) => apiRequest('delete', endpoint);
export const patchRequest = (endpoint, data) => apiRequest('patch', endpoint, data);
export const getRequestWithSession = (sessionId, endpoint) => apiRequest('get', endpoint, null, sessionId);
export const postRequestWithSession = (sessionId, endpoint, data) => apiRequest('post', endpoint, data, sessionId);

// Fonction pour faire un appel vers un service externe
export const getExternalRequest = async (endpoint) => {
    try {
        const response = await axios.get(endpoint);
        return response.data; // Retourne seulement les données de la réponse
    } catch (error) {
        console.error("External request error:", error);
        throw error;
    }
};

// Fonction pour interagir avec le service ChatGPT
export const askChatGPT = async (payload) => {
    return apiRequest('post', '/chat/', payload);
};
