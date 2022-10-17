import express from 'express';
import projectsControllers from '../controllers/projects';
import projectsValidations from '../validations/projects';

const router = express.Router();

router
  .delete('/:id', projectsControllers.deleteProject)
  .post('/', projectsValidations.validateUpdate, projectsControllers.updateProject);

export default router;
