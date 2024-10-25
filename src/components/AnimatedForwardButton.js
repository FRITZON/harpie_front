import React from 'react';
import { ArrowRight } from 'lucide-react';
import Loader from './loader/Loader';

const AnimatedForwardButton = ({ onclick, is_loading, disabled }) => {
  return (
    <button onClick={onclick} disabled={disabled} className="animated-button-forward" type="button">
      <div className="sliding-background-forward">
        {
            is_loading ? <Loader /> : <ArrowRight size={25} color="black" />
        }
      </div>
      <p className="button-text-forward">Go Forward</p>
    </button>
  );
};

export default AnimatedForwardButton;