import { useContext } from 'react';
import userContext from '../contexts/userContext';
import { json } from 'react-router-dom';
export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem('currentUser'))?._id,
  title: '',
  category: '',
  cover: '',
  images: [],
  desc: '',
  shortTitle: '',
  shortDesc: '',
  deliveryTime: '',
  revisionTime: '',
  features: [],
  price: '',
};

export const gigReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return { ...state, [action.payload.name]: action.payload.value };
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    case 'ADD_FEATURES':
      return { ...state, features: [...state.features, action.payload] };
    case 'REMOVE_FEATURES':
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };
    default:
      return state;
      break;
  }
};
