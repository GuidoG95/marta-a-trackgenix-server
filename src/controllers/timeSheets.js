import TimeSheets from '../models/TimeSheets';

const getAllTimeSheets = async (req, res) => {
  const timesheet = await TimeSheets.find(req.query);
  if (timesheet.length === 0) {
    throw new Error('Time sheet not found');
  }
  try {
    return res.status(200).json({
      message: 'Time Sheet found',
      data: timesheet,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (timesheet.length === 0) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const getTimeSheetsbyId = async (req, res) => {
  const { id } = req.params;
  const result = await TimeSheets.findById(id);
  try {
    if (!result) {
      throw new Error('Id doesnt exist');
    }
    return res.status(200).json({
      message: `Timesheet with id ${id} found`,
      data: result,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (!result) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const createTimeSheets = async (req, res) => {
  try {
    const timeSheet = new TimeSheets({
      description: req.body.description,
      date: req.body.date,
      task: req.body.task,
    });
    const result = await timeSheet.save();
    return res.status(201).json({
      message: 'Timesheet created succesfully',
      default: result,
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

const deleteTimeSheet = async (req, res) => {
  const { id } = req.params;
  const result = await TimeSheets.findByIdAndDelete(id);
  try {
    if (!result) {
      throw new Error('Id doesnt exist');
    }
    return res.status(204).json({
      message: `Timesheet with id ${id} deleted`,
      data: result,
      error: false,
    });
  } catch (error) {
    let status = 400;
    if (!result) {
      status = 404;
    }
    return res.status(status).json({
      message: error.toString(),
      data: undefined,
      error: true,
    });
  }
};

const editTimeSheet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await TimeSheets.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true },
    );
    if (!result) {
      throw new Error('Id doesnt exist');
    }
    return res.status(200).json({
      message: `Timesheet with id ${id} edited`,
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

export {
  getAllTimeSheets,
  getTimeSheetsbyId,
  createTimeSheets,
  deleteTimeSheet,
  editTimeSheet,
};
