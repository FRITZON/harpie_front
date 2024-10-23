import React, { useState, useEffect } from 'react';
import { ReactComponent as Facebook } from '../../../../assets/svg/facebook.svg';

const FacebookSignIn = () => {
  const [isFBSDKLoaded, setIsFBSDKLoaded] = useState(false);
  const [isHttps, setIsHttps] = useState(false);
  const [fbStatus, setFbStatus] = useState({
    isSDKLoaded: false,
    isInitialized: false,
    error: null
  });

  useEffect(() => {
    

    // Initialize Facebook SDK
    const initFacebookSDK = () => {
      return new Promise((resolve) => {
        
        // Load the SDK
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: '1689627608277178',
            cookie: true,
            xfbml: true,
            version: 'v18.0'
          });
          setFbStatus(prev => ({ ...prev, isInitialized: true }));
          resolve();
        };

        // Load SDK script
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.id = 'facebook-jssdk';
        
        script.onload = () => {
          setFbStatus(prev => ({ ...prev, isSDKLoaded: true }));
        };

        document.body.appendChild(script);
      });
    };

    initFacebookSDK().catch(error => {
      setFbStatus(prev => ({ ...prev, error: 'Failed to load Facebook SDK' }));
      console.error('Facebook SDK initialization error:', error);
    });

    // Cleanup
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) {
        script.remove();
      }
    };
  }, []);

  const handleFacebookLogin = () => {
    
    console.log('Logging in with Facebook...');
    
    window.FB.login(function(response) {
      if (response.authResponse) {
        console.log('Welcome! Fetching your information....');
        window.FB.api('/me', {fields: 'name, email'}, function(response) {
          console.log('Good to see you, ' + response.name + '.');
          console.log('Email: ' + response.email);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'public_profile,email'});
  };

  return (
    <div 
      className='facebook_button social_auth_btn auth_form_input'
      onClick={handleFacebookLogin}
    >
      <span><Facebook /></span>
      Sign in with Facebook
    </div>
  );
};

export default FacebookSignIn;