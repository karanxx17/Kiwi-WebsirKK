const Employee = require("../models/Employee");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, role, image, bio, followersCount } = req.body;
    const newEmployee = new Employee({ name, role, image, bio, followersCount: followersCount || 0 });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, role, image, bio, followersCount } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, role, image, bio, followersCount },
      { new: true, runValidators: true }
    );
    
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    
    res.json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.followEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { deviceId } = req.body;
    const employee = await Employee.findById(id);

    if (!employee) return res.status(404).json({ message: "Employee not found" });

    if (!employee.followedByDevices) employee.followedByDevices = [];

    const index = employee.followedByDevices.indexOf(deviceId);
    if (index === -1) {
      employee.followedByDevices.push(deviceId);
      employee.followersCount++;
    } else {
      employee.followedByDevices.splice(index, 1);
      employee.followersCount--;
    }

    await employee.save();
    res.json({ followersCount: employee.followersCount, isFollowed: index === -1 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
