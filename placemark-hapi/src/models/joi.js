import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).label("UserCredentialsSpec");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
}).label("UserSpecDetails");

export const  UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  role: Joi.string().valid("user", "admin"),
}).label("UserSpecDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const PlacemarkSpec = Joi.object().keys({
  name: Joi.string().required(),
  description: Joi.string().required(),
  lat: Joi.number().required(),
  long: Joi.number().required(),
  categorie: Joi.string().valid("Landscape feature", "National monumentum", "Walking Trail", "Bridge", "Tree", "Venue",
  "Ringfort", "Dolmen", "River", "Bog", "Island", "Forest").required(),
  userid: IdSpec,
}).label("PlacemarkSpec");

export const PlacemarkSpecPlus = PlacemarkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
  img: Joi.string(),
}).label("PlacemarkSpecPlus");

export  const PlacemarkArray = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");

export const changeNameSpec = Joi.object().keys({
  newFirstName: Joi.string().required(),
  newLastName: Joi.string().required(),
}).label("ChangeNameSpec");

export const changeMailSpec = Joi.object().keys({
  oldMail: Joi.string().email().required() ,
  newMail: Joi.string().email().required(),
  newMailConfirm: Joi.string().email().required(),
}).label("ChangeMailSpec");

export const changePassSpec = Joi.object().keys({
  oldPass: Joi.string().required(),
  newPass: Joi.string().required(),
  newPassConfirm: Joi.string().required(),
}).label("ChangePassSpec");

export const JwtAuth = Joi.object()
.keys({
  success: Joi.boolean().example("true").required(),
  token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
})
.label("JwtAuth");