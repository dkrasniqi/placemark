import Joi from "joi";

export const UserSpec = {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
 
export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export const PlacemarkSpec = {
  name: Joi.string().required(),
  description: Joi.string().required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
  categorie: Joi.string().valid("Landscape feature", "National monumentum", "Walking Trail", "Bridge", "Tree", "Venue",
  "Ringfort", "Dolmen", "River", "Bog", "Island", "Forest").required(),
};

export const changeNameSpec = {
  newFirstName: Joi.string().required(),
  newLastName: Joi.string().required(),
};

export const changeMailSpec = {
  oldMail: Joi.string().email().required() ,
  newMail: Joi.string().email().required(),
  newMailConfirm: Joi.string().email().required(),
};

export const changePassSpec = {
  oldPass: Joi.string().required(),
  newPass: Joi.string().required(),
  newPassConfirm: Joi.string().required(),
};