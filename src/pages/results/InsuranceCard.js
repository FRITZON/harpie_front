export default function InsuranceCard({ insurance, sessionID, onGetQuote, onViewDetails }) {
    const loadImage = () => {
      return insurance?.company?.logo && 'https://harpie-app.site' + insurance?.company?.logo.replace('media', 'static');
    };
  
    return (
      <div className="insurance-card">
        <div className="insurance-card-header">
          <img src={loadImage()} alt={insurance?.company?.name} className="company-logo" />
          <div className="company-info">
            <h3>{insurance?.company?.name}</h3>
            <p>{insurance?.description}</p>
          </div>
        </div>
  
        <div className="insurance-details">
          <div className="detail-row">
            <span className="detail-label">Coverage:</span>
            <span className="detail-value">{insurance?.coverage?.coverage_rate}%</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Hospital Type:</span>
            <span className="detail-value">{insurance?.coverage?.hospital_type}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Connected Hospitals:</span>
            <span className="detail-value">{insurance?.network_hospitals?.length}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Annual Premium:</span>
            <span className="detail-value">{insurance?.plan?.adult_annual_premium} XAF</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">1 Year</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Guarantees:</span>
            <span className="detail-value">{insurance?.guarantees?.length} Guarantees</span>
          </div>
        </div>
  
        <div className="insurance-actions">
          <button className="btn-quote" onClick={() => onGetQuote(insurance.id, sessionID)}>
            Get a Quote
          </button>
          <button className="btn-details" onClick={() => onViewDetails(insurance, sessionID)}>
            View detail results
          </button>
        </div>
      </div>
    );
  }
  
  