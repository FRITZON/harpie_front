import React, { useState, useEffect } from 'react';
import { Facebook } from 'lucide-react'; // Using lucide-react instead of direct SVG import

const FacebookSignIn = () => {
  const [fbStatus, setFbStatus] = useState({
    isSDKLoaded: false,
    isInitialized: false,
    error: null
  });

  useEffect(() => {
    // Check if we're on HTTPS
    if (window.location.protocol !== 'https:') {
      setFbStatus(prev => ({ ...prev, error: 'Facebook Login requires HTTPS' }));
      return;
    }

    // Initialize Facebook SDK
    const initFacebookSDK = () => {
      return new Promise((resolve) => {
        // Only load SDK once
        if (window.FB) {
          resolve();
          return;
        }

        // Load the SDK
        window.fbAsyncInit = function() {
          window.FB.init({
            appId: 'YOUR_FACEBOOK_APP_ID',
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

  const handleFacebookLogin = async () => {
    if (fbStatus.error) {
      console.error(fbStatus.error);
      return;
    }

    if (!fbStatus.isSDKLoaded || !fbStatus.isInitialized) {
      console.log('Facebook SDK is still initializing. Please wait...');
      return;
    }

    try {
      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response);
          } else {
            reject(new Error('User cancelled login or did not fully authorize.'));
          }
        }, { scope: 'public_profile,email' });
      });

      // Get user data
      const userInfo = await new Promise((resolve, reject) => {
        window.FB.api('/me', { fields: 'name,email' }, (response) => {
          if (response.error) {
            reject(new Error('Failed to fetch user data'));
          } else {
            resolve(response);
          }
        });
      });

      console.log('Logged in successfully:', userInfo);
      // Here you can handle the successful login, e.g.:
      // await handleSocialLogin('facebook', userInfo);
      
    } catch (error) {
      console.error('Facebook login error:', error.message);
      setFbStatus(prev => ({ ...prev, error: error.message }));
    }
  };

  return (
    <button 
      className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={handleFacebookLogin}
      disabled={!fbStatus.isSDKLoaded || !fbStatus.isInitialized || fbStatus.error}
    >
      <Facebook size={20} />
      <span>Sign in with Facebook</span>
    </button>
  );
};

export default FacebookSignIn;