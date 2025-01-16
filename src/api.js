import axios from "axios";


const user = JSON.parse(localStorage.getItem('user'))

const token = user?.access ? user.access : ""

const configToken = {
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

const configGlobal = token ? configToken : config

const BASEURL = "https://harpie-app.site/api/v1"



/**
 * Function to make a GET Request
 * @param { String } endpoint The endpoint to make the request to 
 * @returns A promise that resolves to the response of the request
 */
export const getRequest = async(endpoint) => {
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`)
        return response
    } catch (err) {
        return err
    }
}


/**
 * Function to make a DELETE Request
 * @param { String } endpoint It is the endpoint to make the request to
 * @returns Makes a POST Request
 */
export const deleteRequest = async(endpoint) => {
    try {
        const response = await axios.delete(`${BASEURL}${endpoint}`, configGlobal);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}


/**
 * Function to make a PATCH/PARTIAL UPDATE Request
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const patchRequest = async(endpoint, data) => {
    try {
        const response = await axios.patch(`${BASEURL}${endpoint}`, data, configGlobal);
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}


/**
 * A function that makes API request to any external service used in the application
 * @param {String } endpoint Complete URL user wants to make a request to
 * @returns A promise that resolves to the response of the request
 */
export const getExternalRequest = async(endpoint) => {
    try {
        const response = await axios.get(endpoint)
        return response
    } catch (err) {
        return err
    }
}

/**
 * Function to make a POST Request for general endpoints
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const  postRequest = async (endpoint, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        }
    }
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, config);
        
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}
/**
 * Function to make a POST Request for general endpoints
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const  postRequestWithLanguage = async (endpoint, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en"
        }
    }
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, config);
        
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}


export const  getRequestWithLanguage = async (endpoint) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept-Language": "en"
        }
    }
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`, config);
        
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}


/**
 * Function to make a POST Request ( Authentication Specific Requests )
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const  auth = async (endpoint, data) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, config);
        
        return response
    } catch (error) {
        console.error(error);
        return error
    }
}



// ===================


/**
 * Function to make a GET Request with session ID
 * @param { String } sessionId The session ID to include in the request
 * @param { String } endpoint The endpoint to make the request to 
 * @returns A promise that resolves to the response of the request
 */
export const getRequestWithSession = async (sessionId, endpoint) => {
    const configWithSession = {
        headers: {
            "Content-Type": "application/json",
            "X-Session-ID": sessionId
        }
    };
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`, configWithSession);
        return response;
    } catch (err) {
        console.error("GET request error:", err);
        return err;
    }
};

/**
 * Function to make a POST Request with session ID
 * @param { String } sessionId The session ID to include in the request
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const postRequestWithSession = async (sessionId, endpoint, data) => {
    const configWithSession = {
        headers: {
            "Content-Type": "application/json",
            "X-Session-ID": sessionId
        }
    };
    
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, configWithSession);
        return response;
    } catch (error) {
        console.error("POST request error:", error);
        return error;
    }
};


export const authenticatedGetRequest = async (endpoint) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    };

    console.log('config', config)
    
    try {
        const response = await axios.get(`${BASEURL}${endpoint}`, config);
        return response;
    } catch (error) {
        console.error("POST request error:", error);
        return error;
    }
};


/**
 * Function to make a POST Request with session ID for authenticated users
 * @param { String } sessionId The session ID to include in the request
 * @param { String } endpoint The endpoint to make the request to
 * @param { Object } data The data to send in the request
 * @returns A promise that resolves to the response of the request
 */
export const authenticatedPostRequestWithSession = async (sessionId, endpoint, data) => {
    const configWithSession = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "X-Session-ID": sessionId
        }
    };
    
    try {
        const response = await axios.post(`${BASEURL}${endpoint}`, data, configWithSession);
        return response;
    } catch (error) {
        console.error("POST request error:", error);
        return error;
    }
};


export const askChatGPT = async (payload) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        }
    };
    
    try {
        const response = await axios.post('https://harpie-app.site/api/v1/chat/', payload, config);
        return response;
    } catch (error) {
        console.error("POST request error:", error);
        return error;
    }
};