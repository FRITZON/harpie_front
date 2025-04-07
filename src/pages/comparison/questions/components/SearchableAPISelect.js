
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuestionContext } from '../../../../context/QuestionContext';
import SearchableList from './SearchableList';


const SearchableAPISelect = ({ api, questionId, currentAnswer, newResults, lang }) => {
  const [list, setList] = useState([]); // État pour stocker les marques ou autres listes
  const [models, setModels] = useState([]); // État pour stocker les modèles
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [makeName, setMakeName] = useState(newResults.vehicle_information?.vehicle_make || ''); // État pour stocker la marque sélectionnée

  const context = useQuestionContext();

  // Vérification de l'API pour déterminer le type de requête
  const isVehicleMake = api.includes('/vehicles/makes/');
  //console.log("api marque", isVehicleMake);
  const isVehicleModel = api.includes('/vehicles/models/');
  //console.log("api modèle", isVehicleModel);
  //console.log("MakeName", makeName);
  
  // Étape 1 : Récupération des Marques pour les types appropriés
  useEffect(() => {
    if (questionId !== "vehicle_model") {
      const fetchMakes = async () => {
        try {
          setLoading(true);
          const response = await axios.get(api); // API pour récupérer les marques
          console.log("response de toutes", response);
          
          if (response.status === 200) {
            setList(response.data);
            console.log("response marque", response.data);
          }
        } catch (err) {
          setError('An error occurred while fetching makes.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchMakes();
    } else  {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(api); // API pour récupérer les données
          if (response.status === 200) {
            setList(response.data);
              console.log("response Modèle", response.data);
            }
          } catch (err) {
            setError('An error occurred while fetching data.');
            console.error(err);
          } finally {
            setLoading(false);
          }
        
  
        fetchData();
        
      }
   
    }
  }, [api, questionId]); // Dépend de l'API et de la condition

  // Étape 2 : Récupération des Modèles lorsque makeName change
  useEffect(() => {
    if (isVehicleMake && makeName) {
      const fetchModels = async () => {
        try {
          setLoading(true);
          const url = `http://localhost:8000/api/v1/vehicles/models/?make_name=${encodeURIComponent(makeName)}`; // URL pour récupérer les modèles
          const response = await axios.get(url);
          if (response.status === 200) {
            setModels(response.data);
            console.log("response modèle", response.data);
          }
        } catch (err) {
          setError('An error occurred while fetching models.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchModels();
    }
  }, [makeName, isVehicleMake]); // Dépend de makeName et du type de modèle

  const handleSelectMake = (id, value) => {
    if (id && value) {
      context.handleAnswer({ [id]: value });
      setMakeName(value); // Mettre à jour makeName avec la valeur sélectionnée
    }
  };

  const handleSelectModel = (id, value) => {
    if (id && value) {
      context.handleAnswer({ [id]: value });
    }
  };

  return (<div className='options'>
    {loading && <p>Loading...</p>}
    {error && <p className="error-message">{error}</p>}

    {/* <p className='question-text'>{lang === 'en' ? 'Select a Make' : 'Sélectionnez une Marque'}</p> */}
    <SearchableList 
      list={list} 
      onSelect={handleSelectMake} 
      questionId={questionId} 
    />

    {models.length > 0 && (
      <>
        <p className='question-text'>{lang === 'en' ? 'Select a Model' : 'Sélectionnez un Modèle'}</p>
        <SearchableList 
          list={models} 
          onSelect={handleSelectModel} 
          questionId={questionId} 
        />
      </>
    )}
  </div>
);
};

export default SearchableAPISelect;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuestionContext } from '../../../../context/QuestionContext';
// import SearchableList from './SearchableList';

// const SearchableAPISelect = ({ api, questionId, currentAnswer, newResults, lang }) => {
//   const [list, setList] = useState([]); // État pour stocker les marques
//   const [models, setModels] = useState([]); // État pour stocker les modèles
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [makeName, setMakeName] = useState(newResults.vehicle_information?.vehicle_make);


//   const context = useQuestionContext();
//   const isVehicleMake = api.includes('/vehicles/makes/');
//   console.log("api marque", isVehicleMake);
//   const isVehicleModel = api.includes('/vehicles/models/');
//   console.log("api modèle", isVehicleModel);

//   //console.log("makeName", makeName);

  
//   // Étape 1 : Récupération des Marques
//   useEffect(() => {
//     const fetchMakes = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(api);
//         if (response.status === 200) {
//           setList(response.data);
//           console.log("Les autres", response.data);
//         }
//       } catch (err) {
//         setError('An error occurred while fetching makes.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (questionId !== "vehicle_model") {
//       fetchMakes();
      
//     }
//   }, [api, questionId]);

//   // Étape 2 : Récupération des Modèles lorsque makeName change
//   useEffect(() => {
//     const fetchModels = async () => {
//       if (makeName) {
//         try {
//           setLoading(true);
//           const url = `http://localhost:8000/api/v1/vehicles/models/?make_name=${encodeURIComponent(makeName)}`;
//           const response = await axios.get(url);
//           if (response.status === 200) {
//             setModels(response.data);
//             console.log("Les modèles", response.data);

//           }
//         } catch (err) {
//           setError('An error occurred while fetching models.');
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     if (makeName) {
//       fetchModels();
      
//     }
//   }, [makeName]);

//   // const handleSelectMake = (id, value) => {
//   //   if (id && value) {
//   //     context.handleAnswer({ [id]: value });
//   //     setMakeName(value); // Mettre à jour makeName avec la valeur sélectionnée
//   //     setModels([]); // Réinitialiser les modèles lors de la sélection d'une nouvelle marque
//   //   }
//   // };


//   const handleSelectMake = (id, value) => {
//     console.log("Selected Make Value:", value); // Vérifiez la valeur
//     setMakeName(value); // Mettre à jour makeName avec la valeur sélectionnée
//     if (id && value) {
//       context.handleAnswer({ [id]: value });
//       //setMakeName(value); // Mettre à jour makeName
//       setModels([]); // Réinitialiser les modèles
//     }
//   };
  
//   // useEffect(() => {
//   //   console.log("Updated makeName:", makeName); // Affichez la nouvelle valeur de makeName
//   // }, [makeName]);

//   const handleSelectModel = (id, value) => {
//     if ( value) {
//       context.handleAnswer({ [id]: value });
//     }
//   };

//   return (
//     <div className='options'>
//       {loading && <p>Loading...</p>}
//       {error && <p className="error-message">{error}</p>}

//       <SearchableList 
//         list={list} 
//         onSelect={handleSelectMake} 
//         questionId={questionId} 
//       />

//       {models.length > 0 && (
//         <>
//           <p className='question-text'>{lang === 'en' ? 'Select a Model' : 'Sélectionnez un Modèle'}</p>
//           <SearchableList 
//             list={models} 
//             onSelect={handleSelectModel} 
//             questionId={questionId} 
//           />
//         </>
//       )}
//     </div>
//   );
// };

// export default SearchableAPISelect;