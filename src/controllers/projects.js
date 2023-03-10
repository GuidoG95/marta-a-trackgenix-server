import Projects from '../models/Projects';

const getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find(req.query)
      .populate('employees.id')
      .populate('projectManager');
    if (Object.keys(req.query).length !== 0 && projects.length === 0) {
      throw new Error('Project not found');
    }
    const message = projects.length ? 'Project found' : 'Project not found';
    return res.status(200).json({
      message,
      data: projects,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Projects.findById(id)
      .populate('employees.id')
      .populate('projectManager');
    if (!project) {
      throw new Error('Project not found');
    }
    return res.status(200).json({
      message: `Project ${req.params.id} found.`,
      data: project,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const createProject = async (req, res) => {
  try {
    const post = new Projects({
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      clientName: req.body.clientName,
      projectManager: req.body.projectManager,
      employees: req.body.employees,
      active: false,
    });
    post.populate('employees.id');
    const result = await post.save();
    return res.status(201).json({
      message: 'Project created.',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndDelete(id);
    if (!result) {
      throw new Error('Project not found');
    }
    return res.status(200).json({
      message: `Project with id ${id} successfully deleted!`,
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Projects.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    if (!result) {
      throw new Error('Project not found');
    }
    return res.status(200).json({
      message: `Project with Id ${id} updated.`,
      data: result,
      error: false,
    });
  } catch (error) {
    let statusCode = 400;
    if (error.message.includes('Project not found')) {
      statusCode = 404;
    }
    return res.status(statusCode).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

export {
  getAllProjects,
  getProjectById,
  createProject,
  deleteProject,
  updateProject,
};
