import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './AnimatedBackButton.css';
import Loader from './loader/Loader';

const AnimatedBackButton = ({ onclick, is_loading, disabled }) => {
  return (
    <button  onClick={onclick} disabled={disabled} className="animated-button" type="button">
      <div className="sliding-background">
        <ArrowLeft size={25} color="black" />
      </div>
      <p className="button-text">Go Back</p>
    </button>
  );
};

export default AnimatedBackButton;