import React, { useEffect } from 'react';
import { postRequest } from '../../../../api';
import { jwtDecode } from "jwt-decode";

const GoogleSignIn = () => {
  useEffect(() => {
    const google = window.google;
    google?.accounts?.id?.initialize({
      client_id: "1086958839206-shumhednu0e6ickb6q9vhsnm1rvt9lhg.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google?.accounts?.id?.renderButton(
      document.getElementById("googleSignInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

  const handleCredentialResponse = (response) => {
    authenticate_google(response)
    console.log(response)
    console.log('-=========================')
    const userObject = jwtDecode(response.credential);
    console.log(userObject);
  };

  const authenticate_google = async(google_payload) => {
    const data = {
        id_token: google_payload.credential,
        
    }
    const response = await postRequest('/auth/social-auth/google/', data)
    console.log(response);
    
  }

  return (
    <div>
      <div id="googleSignInDiv"></div>
    </div>
  );
};

export default GoogleSignIn;