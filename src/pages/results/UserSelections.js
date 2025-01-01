
  export function UserSelections({ selections }) {
    const insureeInfo = JSON.parse(selections.insuree_information.insuree_information);
    const lifePlans = JSON.parse(selections.coverage_details.life_plans);
  
    return (
      <div className="user-selections">
        <h2>Your Selections</h2>
        <div className="selections-grid">
          <div className="selection-item">
            <h3>Insuree</h3>
            <p>{insureeInfo.user_data.name}</p>
            <p>Born: {new Date(insureeInfo.user_data.dob).toLocaleDateString()}</p>
            <p>Profession: {insureeInfo.user_data.profession}</p>
          </div>
          <div className="selection-item">
            <h3>Coverage</h3>
            <p>Type: {selections.coverage_details.insurance_type}</p>
            <p>Plans: {Object.keys(lifePlans).filter(key => lifePlans[key]).join(', ')}</p>
          </div>
          <div className="selection-item">
            <h3>Pricing</h3>
            <p>Frequency: {selections.pricing.payment_frequency}</p>
            <p>Initial Deposit: {selections.pricing.initial_deposit} XAF</p>
          </div>
          <div className="selection-item">
            <h3>Insurance Plan</h3>
            {/* <p>Business Type: {selections.empowerment_plan.business_type}</p>
            <p>Business Value: {selections.empowerment_plan.business_value} XAF</p> */}
          </div>
        </div>
      </div>
    );
  }
  
  