import Joi from 'joi';

const validateCreation = (req, res, next) => {
  const timeSheetsValidations = Joi.object().keys({
    description: Joi.string().min(5).max(100).required(),
    date: Joi.date().required(),
    task: Joi.string().required(),
    hours: Joi.number().required(),
    project: Joi.string().required(),
    employee: Joi.string().required(),
  });

  const validation = timeSheetsValidations.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

const validateEdition = (req, res, next) => {
  const timeSheetsValidations = Joi.object({
    description: Joi.string().min(5).max(100),
    date: Joi.date(),
    task: Joi.string(),
    hours: Joi.number(),
    project: Joi.string(),
    employee: Joi.string(),
  });

  const validation = timeSheetsValidations.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).json({
      message: `There was an error: ${validation.error.message} `,
      data: undefined,
      error: true,
    });
  }
  return next();
};

export {
  validateCreation,
  validateEdition,
};
