import React from 'react';


const MapIcon = ({network_hospitals}) => (
  <svg className="hosp_info_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const BuildingIcon = () => (
  <svg className="hosp_info_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01M8 10h.01M8 14h.01M16 6h.01M16 10h.01M16 14h.01" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="hosp_info_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="hosp_info_icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);
const NetworkedHospitals = ({network_hospitals}) => {

  return (
    <>
      <div className="hosp_container">
        <h2 className="hosp_title">Connected Hospitals</h2>
        <div className="hosp_grid">
          {network_hospitals.map((hospital) => (
            <div key={hospital.id} className="hosp_card">
              <div className="hosp_card_content">
                <div className="hosp_header">
                  <h3 className="hosp_name">{hospital.name}</h3>
                  <span className={`hosp_type_badge hosp_type_${hospital.type}`}>
                    {hospital.type}
                  </span>
                </div>
                
                <div className="hosp_info_container">
                  <div className="hosp_info_row">
                    <MapIcon />
                    <span className="hosp_info_text">{hospital.address}</span>
                  </div>
                  
                  <div className="hosp_info_row">
                    <BuildingIcon />
                    <span className="hosp_info_text">{hospital.city}</span>
                  </div>
                  
                  {hospital.phone && (
                    <div className="hosp_info_row">
                      <PhoneIcon />
                      <span className="hosp_info_text">{hospital.phone}</span>
                    </div>
                  )}
                  
                  {hospital.email && (
                    <div className="hosp_info_row">
                      <EmailIcon />
                      <span className="hosp_info_text">{hospital.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NetworkedHospitals;