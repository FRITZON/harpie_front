import React, { useState } from 'react';
import './ComparisonForm.css';
import { motion, AnimatePresence } from 'framer-motion';
import Login from '../../auth/login/Login';
import { useTranslation } from 'react-i18next';

const initialVehicleState = {
  marque: '',
  modele: '',
  type: '',
  energie: '',
  puissance: '',
  ville: '',
  vignette: 'non',
  remorque: 'non',
  matieres: 'non',
  hasInsurance: 'non',
  insuranceCompany: '',
  isInsuranceValid: 'non',
  insuranceExpirationDate: '',
  garanties: {
    responsabiliteCivile: true,
    tousRisques: false,
    defenseRecours: false,
    individuellePT: false,
    decesAccidentel: false,
    invalidite: false,
    vol: false,
    brisGlace: false,
    assistanceJuridique: false,
    fraisMedicaux: false
  },
  usage: '',
  duree: ''
};

const carBrands = [
  "Toyota", "Honda", "Ford", "Chevrolet", "Volkswagen", "BMW", "Mercedes-Benz", 
  "Audi", "Hyundai", "Kia", "Nissan", "Mazda", "Peugeot", "Renault", "Citroën"
];

const carModels = {
  Toyota: ["Corolla", "Camry", "RAV4", "Highlander", "Prius"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "HR-V"],
  Ford: ["F-150", "Escape", "Explorer", "Mustang", "Focus"],
  Chevrolet: ["Silverado", "Equinox", "Malibu", "Traverse", "Tahoe"],
  Volkswagen: ["Golf", "Passat", "Tiguan", "Atlas", "Jetta"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  "Mercedes-Benz": ["C-Class", "E-Class", "GLC", "GLE", "S-Class"],
  Audi: ["A3", "A4", "Q5", "Q7", "A6"],
  Hyundai: ["Elantra", "Sonata", "Tucson", "Santa Fe", "Kona"],
  Kia: ["Forte", "Optima", "Sportage", "Telluride", "Soul"],
  Nissan: ["Altima", "Rogue", "Sentra", "Maxima", "Pathfinder"],
  Mazda: ["Mazda3", "CX-5", "Mazda6", "CX-9", "CX-30"],
  Peugeot: ["208", "2008", "3008", "5008", "508"],
  Renault: ["Clio", "Captur", "Megane", "Kadjar", "Koleos"],
  Citroën: ["C3", "C4", "C5", "Berlingo", "C3 Aircross"]
};



const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const steps = [
  { number: 1, label: 'véhicule' },
  { number: 2, label: 'garanties' },
  { number: 3, label: 'résumé' },
  { number: 4, label: 'connexion' }
];

const guaranteesList = [
  { id: 'responsabiliteCivile', label: 'La Responsabilité Civile / RTI ( Obligatoire)', required: true },
  { id: 'tousRisques', label: 'Tous Risques' },
  { id: 'defenseRecours', label: 'Défense Recours' },
  { id: 'individuellePT', label: 'Individuelle Personnes Transportées' },
  { id: 'decesAccidentel', label: 'Décès Accidentel' },
  { id: 'invalidite', label: 'Invalidité Partielle/Totale' },
  { id: 'vol', label: 'Vol' },
  { id: 'brisGlace', label: 'Bris de Glace' },
  { id: 'assistanceJuridique', label: 'Assistance Juridique' },
  { id: 'fraisMedicaux', label: 'Frais Médicaux/Pharmacie' }
];



function ComparisonForm({ onSubmit }) {
  const { t } = useTranslation();
  const [vehicle, setVehicle] = useState(initialVehicleState);
  const [usage, setUsage] = useState('');
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'marque') {
      setVehicle((prev) => ({ ...prev, [name]: value, modele: '' }));
    } else if (name.startsWith('garantie_')) {
      const garantieId = name.replace('garantie_', '');
      setVehicle((prev) => ({
        ...prev,
        garanties: {
          ...prev.garanties,
          [garantieId]: checked
        }
      }));
    } else {
      setVehicle((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    setDirection(1);
    setStep(current => Math.min(current + 1, 3));
  };

  const handleBack = () => {
    setDirection(-1);
    setStep(current => Math.max(current - 1, 1));
  };

  

  return (
    <div className="comparison-form-container">
      <div className="stepper">
        {steps.map((s) => (
          <div key={s.number} className={`step ${step >= s.number ? 'active' : ''}`}>
            <div className="step-number">{s.number}</div>
            <div className="step-label">{s.label}</div>
            {s.number < steps.length && <div className="step-line" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait" custom={direction}>
        {step === 1 ? (
          <motion.div
            key="step1"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-step"
          >
            <h2>Informations du véhicule</h2>
            <form onSubmit={handleNext} className="comparison-form">
              <div className="form-group">
                <label>Marque</label>
                <select 
                  name="marque" 
                  value={vehicle.marque} 
                  onChange={handleChange}
                  required 
                >
                  <option value="">Sélectionner une marque</option>
                  {carBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Modèle</label>
                <select 
                  name="modele" 
                  value={vehicle.modele} 
                  onChange={handleChange}
                  required 
                  disabled={!vehicle.marque}
                >
                  <option value="">Sélectionner un modèle</option>
                  {vehicle.marque && carModels[vehicle.marque].map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Type de Véhicule</label>
                <select name="type" value={vehicle.type} onChange={handleChange} required>
                  <option value="">Sélectionner</option>
                  <option value="berline">Berline</option>
                  <option value="suv">SUV</option>
                  <option value="pickup">Pick-up</option>
                  <option value="van">Van</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div className="form-group">
                <label>Source d'Energie</label>
                <select name="energie" value={vehicle.energie} onChange={handleChange} required>
                  <option value="">Sélectionner</option>
                  <option value="essence">Essence</option>
                  <option value="diesel">Diesel</option>
                  <option value="electrique">Électrique</option>
                  <option value="hybride">Hybride</option>
                </select>
              </div>

              <div className="form-group">
                <label>Puissance Fiscale</label>
                <input 
                  type="number" 
                  name="puissance" 
                  value={vehicle.puissance} 
                  onChange={handleChange}
                  placeholder="Ex: 7"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Ville de circulation</label>
                <input 
                  name="ville" 
                  value={vehicle.ville} 
                  onChange={handleChange}
                  placeholder="Ex: Douala"
                  required 
                />
              </div>

              <div className="form-row three-columns">
                <div className="form-group">
                  <label>Vignette</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="vignette"
                        value="oui"
                        checked={vehicle.vignette === 'oui'}
                        onChange={handleChange}
                      />
                      Oui
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="vignette"
                        value="non"
                        checked={vehicle.vignette === 'non'}
                        onChange={handleChange}
                      />
                      Non
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Remorque</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="remorque"
                        value="oui"
                        checked={vehicle.remorque === 'oui'}
                        onChange={handleChange}
                      />
                      Oui
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="remorque"
                        value="non"
                        checked={vehicle.remorque === 'non'}
                        onChange={handleChange}
                      />
                      Non
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Matières inflammables</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="matieres"
                        value="oui"
                        checked={vehicle.matieres === 'oui'}
                        onChange={handleChange}
                      />
                      Oui
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="matieres"
                        value="non"
                        checked={vehicle.matieres === 'non'}
                        onChange={handleChange}
                      />
                      Non
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-group usage-group">
                <label>But d'utilisation du véhicule</label>
                <div className="usage-options">
                  <label className={`usage-option ${usage === 'privé' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="usage"
                      value="privé"
                      checked={usage === 'privé'}
                      onChange={(e) => setUsage(e.target.value)}
                      required
                    />
                    <span className="icon">🚗</span>
                    <span className="text">Usage Privé</span>
                    <span className="description">Pour usage personnel, familial et non-commercial</span>
                  </label>
                  
                  <label className={`usage-option ${usage === 'commercial' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="usage"
                      value="commercial"
                      checked={usage === 'commercial'}
                      onChange={(e) => setUsage(e.target.value)}
                      required
                    />
                    <span className="icon">🚚</span>
                    <span className="text">Usage Commercial</span>
                    <span className="description">Pour activités professionnelles, transport commercial ou business</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="form-button">Suivant</button>
            </form>
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-step"
          >
            <h2>Informations sur l'assurance et garanties</h2>
            <form onSubmit={handleNext} className="comparison-form">
              <div className="form-group">
                <label>Do you have current insurance?</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value="oui"
                      checked={vehicle.hasInsurance === 'oui'}
                      onChange={handleChange}
                      required
                    />
                    Yes
                  </label><label className="radio-label"><input type="radio" name="hasInsurance" value="non" checked={vehicle.hasInsurance === 'non'} onChange={handleChange} required />No</label></div>
              </div>

              {vehicle.hasInsurance === 'oui' && (
                <>
                  <div className="form-group">
                    <label>Insurance Company</label>
                    <select
                      name="insuranceCompany"
                      value={vehicle.insuranceCompany || ''}
                      onChange={handleChange}
                      required={vehicle.hasInsurance === 'oui'}
                    >
                      <option value="">Select a company</option>
                      <option value="axa">AXA</option>
                      <option value="allianz">Allianz</option>
                      <option value="prudential">Prudential</option>
                      <option value="sanlam">Sanlam</option>
                      <option value="activa">Activa</option>
                      <option value="chanas">Chanas</option>
                      <option value="other">{t('partial_result.vehicle.code.other')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Is the insurance valid?</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="isInsuranceValid"
                          value="oui"
                          checked={vehicle.isInsuranceValid === 'oui'}
                          onChange={handleChange}
                          required={vehicle.hasInsurance === 'oui'}
                        />
                        Yes
                      </label><label className="radio-label"><input type="radio" name="isInsuranceValid" value="non" checked={vehicle.isInsuranceValid === 'non'} onChange={handleChange} required={vehicle.hasInsurance === 'oui'} />No</label></div>
                  </div>

                  {vehicle.isInsuranceValid === 'oui' && (
                    <div className="form-group">
                      <label>Expiration Date</label>
                      <input
                        type="date"
                        name="insuranceExpirationDate"
                        value={vehicle.insuranceExpirationDate || ''}
                        onChange={handleChange}
                        required={vehicle.hasInsurance === 'oui' && vehicle.isInsuranceValid === 'oui'}
                      />
                    </div>
                  )}
                </>
              )}

              <div className="guarantees-list">
                {guaranteesList.map((guarantee) => (
                  <div key={guarantee.id} className="guarantee-item">
                    <label className="guarantee-label">
                      <div className="guarantee-text">{guarantee.label}</div>
                      <div className="guarantee-toggle">
                        <input
                          type="checkbox"
                          name={`garantie_${guarantee.id}`}
                          checked={vehicle.garanties[guarantee.id]}
                          onChange={handleChange}
                          disabled={guarantee.required}
                        />
                        <span className={vehicle.garanties[guarantee.id] ? 'selected' : ''}>
                          {vehicle.garanties[guarantee.id] ? 'Oui' : 'Non'}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="form-group duration-group">
                <label>Durée d'assurance</label>
                <div className="duration-options">
                  <label className={`duration-option ${vehicle.duree === '2' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="2"
                      checked={vehicle.duree === '2'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">2 mois</span>
                  </label>
                  
                  <label className={`duration-option ${vehicle.duree === '4' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="4"
                      checked={vehicle.duree === '4'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">4 mois</span>
                  </label>

                  <label className={`duration-option ${vehicle.duree === '6' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="6"
                      checked={vehicle.duree === '6'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">6 mois</span>
                  </label>

                  <label className={`duration-option ${vehicle.duree === '12' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="12"
                      checked={vehicle.duree === '12'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">1 an</span>
                  </label>
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="form-button back-button">Retour</button>
                <button type="submit" className="form-button">Suivant</button>
              </div>
            </form>
          </motion.div>
        ) : step === 2 ? (
          <motion.div
            key="step2"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-step"
          >
            <h2>Informations sur l'assurance et garanties</h2>
            <form onSubmit={handleNext} className="comparison-form">
              <div className="form-group">
                <label>{t('partial_result.vehicle.has_current_insurance')}</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value="oui"
                      checked={vehicle.hasInsurance === 'oui'}
                      onChange={handleChange}
                      required
                    />
                    {t('partial_result.vehicle.code.yes')}
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value="non"
                      checked={vehicle.hasInsurance === 'non'}
                      onChange={handleChange}
                      required
                    />
                    {t('partial_result.vehicle.code.no')}
                  </label>
                </div>
              </div>

              {vehicle.hasInsurance === 'oui' && (
                <>
                  <div className="form-group">
                    <label>{t('partial_result.vehicle.insurance_company')}</label>
                    <select
                      name="insuranceCompany"
                      value={vehicle.insuranceCompany || ''}
                      onChange={handleChange}
                      required={vehicle.hasInsurance === 'oui'}
                    >
                      <option value="">{t('partial_result.vehicle.select_company')}</option>
                      <option value="axa">AXA</option>
                      <option value="allianz">Allianz</option>
                      <option value="prudential">Prudential</option>
                      <option value="sanlam">Sanlam</option>
                      <option value="activa">Activa</option>
                      <option value="chanas">Chanas</option>
                      <option value="other">{t('partial_result.vehicle.code.other')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>{t('partial_result.vehicle.is_valid')}</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="isInsuranceValid"
                          value="oui"
                          checked={vehicle.isInsuranceValid === 'oui'}
                          onChange={handleChange}
                          required={vehicle.hasInsurance === 'oui'}
                        />
                        {t('partial_result.vehicle.code.yes')}
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="isInsuranceValid"
                          value="non"
                          checked={vehicle.isInsuranceValid === 'non'}
                          onChange={handleChange}
                          required={vehicle.hasInsurance === 'oui'}
                        />
                        {t('partial_result.vehicle.code.no')}
                      </label>
                    </div>
                  </div>

                  {vehicle.isInsuranceValid === 'oui' && (
                    <div className="form-group">
                      <label>{t('partial_result.vehicle.expiration_date')}</label>
                      <input
                        type="date"
                        name="insuranceExpirationDate"
                        value={vehicle.insuranceExpirationDate || ''}
                        onChange={handleChange}
                        required={vehicle.hasInsurance === 'oui' && vehicle.isInsuranceValid === 'oui'}
                      />
                    </div>
                  )}
                </>
              )}

              <div className="guarantees-list">
                {guaranteesList.map((guarantee) => (
                  <div key={guarantee.id} className="guarantee-item">
                    <label className="guarantee-label">
                      <div className="guarantee-text">{guarantee.label}</div>
                      <div className="guarantee-toggle">
                        <input
                          type="checkbox"
                          name={`garantie_${guarantee.id}`}
                          checked={vehicle.garanties[guarantee.id]}
                          onChange={handleChange}
                          disabled={guarantee.required}
                        />
                        <span className={vehicle.garanties[guarantee.id] ? 'selected' : ''}>
                          {vehicle.garanties[guarantee.id] ? 'Oui' : 'Non'}
                        </span>
                      </div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="form-group duration-group">
                <label>Durée d'assurance</label>
                <div className="duration-options">
                  <label className={`duration-option ${vehicle.duree === '2' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="2"
                      checked={vehicle.duree === '2'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">2 mois</span>
                  </label>
                  
                  <label className={`duration-option ${vehicle.duree === '4' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="4"
                      checked={vehicle.duree === '4'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">4 mois</span>
                  </label>

                  <label className={`duration-option ${vehicle.duree === '6' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="6"
                      checked={vehicle.duree === '6'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">6 mois</span>
                  </label>

                  <label className={`duration-option ${vehicle.duree === '12' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="duree"
                      value="12"
                      checked={vehicle.duree === '12'}
                      onChange={handleChange}
                      required
                    />
                    <span className="text">1 an</span>
                  </label>
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="form-button back-button">Retour</button>
                <button type="submit" className="form-button">Suivant</button>
              </div>
            </form>
          </motion.div>
        ) : step === 3 ? (
          <motion.div
            key="step3"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-step"
          >
            <h2>Summary of Your Information</h2>
            <div className="summary-container">
              <div className="summary-section">
                <h3>Vehicle Information</h3>
                <p><strong>Brand:</strong> {vehicle.marque}</p>
                <p><strong>Model:</strong> {vehicle.modele}</p>
                <p><strong>Type:</strong> {vehicle.type}</p>
                <p><strong>Energy Source:</strong> {vehicle.energie}</p>
                <p><strong>Fiscal Power:</strong> {vehicle.puissance}</p>
                <p><strong>City:</strong> {vehicle.ville}</p>
                <p><strong>Usage:</strong> {usage}</p>
              </div>

              <div className="summary-section">
                <h3>Insurance Details</h3>
                <p><strong>Current Insurance:</strong> {vehicle.hasInsurance === 'oui' ? 'Yes' : 'No'}</p>
                {vehicle.hasInsurance === 'oui' && (
                  <>
                    <p><strong>Insurance Company:</strong> {vehicle.insuranceCompany}</p>
                    <p><strong>Insurance Valid:</strong> {vehicle.isInsuranceValid === 'oui' ? 'Yes' : 'No'}</p>
                    {vehicle.isInsuranceValid === 'oui' && (
                      <p><strong>Expiration Date:</strong> {vehicle.insuranceExpirationDate}</p>
                    )}
                  </>
                )}
                <p><strong>Insurance Duration:</strong> {vehicle.duree} {vehicle.duree === '12' ? 'year' : 'months'}</p>
              </div>

              <div className="summary-section">
                <h3>Selected Guarantees</h3>
                <ul>
                  {Object.entries(vehicle.garanties).map(([key, value]) => (
                    value && <li key={key}>{guaranteesList.find(g => g.id === key)?.label}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="confirmation-section">
              <p>Please verify your information before proceeding to login.</p>
              <div className="form-buttons">
                <button type="button" onClick={handleBack} className="form-button back-button">Back</button>
                <button type="button" className="form-button confirm-button" onClick={() => setStep(4)}>Confirm</button>
              </div>
            </div>
          </motion.div>
        ) : step === 4 ? (
          <motion.div
            key="step4"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="form-step"
          >
            <Login />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default ComparisonForm;
