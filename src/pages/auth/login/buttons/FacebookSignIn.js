import React, { useState, useEffect } from 'react';
import { ReactComponent as Facebook } from '../../../../assets/svg/facebook.svg';

const FacebookSignIn = () => {
  const [isFBSDKLoaded, setIsFBSDKLoaded] = useState(false);
  const [isHttps, setIsHttps] = useState(false);

  useEffect(() => {
    // Check if the current page is served over HTTPS
    setIsHttps(window.location.protocol === 'https:');

    const loadFacebookSDK = () => {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId      : 'YOUR_FACEBOOK_APP_ID',
          cookie     : true,
          xfbml      : true,
          version    : 'v16.0'
        });
        window.FB.AppEvents.logPageView();
        setIsFBSDKLoaded(true);
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFacebookSDK();
  }, []);

  const handleFacebookLogin = () => {
    if (!isHttps) {
      console.error('Facebook Login requires HTTPS. Please serve your app over HTTPS.');
      return;
    }

    if (!isFBSDKLoaded) {
      console.log('Facebook SDK is not loaded yet. Please try again in a moment.');
      return;
    }

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