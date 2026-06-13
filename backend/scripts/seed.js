require("dotenv").config();
const mongoose = require("mongoose");

const User = require("../src/features/user/user.model");
const Client = require("../src/features/client/client.model");
const Project = require("../src/features/project/project.model");
const Task = require("../src/features/task/task.model");

const ROLES = require("../src/constants/roles");
const PROJECTSTATUS = require("../src/constants/projectStatus");
const TASKSTATUS = require("../src/constants/taskStatus");
const TASKPRIORITY = require("../src/constants/taskPriority");

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected for seeding");
}

async function clearData() {
  await Task.deleteMany({});
  await Project.deleteMany({});
  await Client.deleteMany({});
  await User.deleteMany({});
  console.log("Existing seed data cleared");
}

async function seedUsers() {
  const usersData = [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: ROLES.ADMIN,
    },
    {
      name: "Rahul Sharma",
      email: "rahul@example.com",
      password: "employee123",
      role: ROLES.EMPLOYEE,
    },
    {
      name: "Priya Singh",
      email: "priya@example.com",
      password: "employee123",
      role: ROLES.EMPLOYEE,
    },
    {
      name: "Amit Verma",
      email: "amit@example.com",
      password: "employee123",
      role: ROLES.EMPLOYEE,
    },
  ];

  const users = [];

  for (const userData of usersData) {
    const user = new User(userData);
    await user.save();
    users.push(user);
  }

  console.log("Users seeded with hashed passwords");
  return users;
}

async function seedClients() {
  const clients = await Client.insertMany([
    {
      name: "Rohan Mehta",
      email: "rohan@acmecorp.com",
      phone: "9876543210",
      companyName: "Acme Corp",
      address: "Sector 15, Noida, Uttar Pradesh",
    },
    {
      name: "Sneha Kapoor",
      email: "sneha@brightmedia.com",
      phone: "9876543211",
      companyName: "Bright Media",
      address: "DLF Phase 2, Gurugram, Haryana",
    },
    {
      name: "Arjun Nair",
      email: "arjun@techspark.io",
      phone: "9876543212",
      companyName: "TechSpark",
      address: "Koramangala, Bengaluru, Karnataka",
    },
  ]);

  console.log("Clients seeded");
  return clients;
}

async function seedProjects(clients) {
  const projects = await Project.insertMany([
    {
      client: clients[0]._id,
      name: "Website Revamp",
      description: "Redesign and rebuild the corporate website.",
      startDate: new Date("2026-06-01"),
      dueDate: new Date("2026-06-25"),
      status: PROJECTSTATUS.INPROGRESS,
    },
    {
      client: clients[1]._id,
      name: "CRM Dashboard",
      description: "Build a dashboard for internal sales tracking.",
      startDate: new Date("2026-06-05"),
      dueDate: new Date("2026-06-30"),
      status: PROJECTSTATUS.NOTSTARTED,
    },
    {
      client: clients[2]._id,
      name: "Mobile App Backend",
      description: "Develop backend APIs for mobile app features.",
      startDate: new Date("2026-05-20"),
      dueDate: new Date("2026-06-18"),
      status: PROJECTSTATUS.INPROGRESS,
    },
  ]);

  console.log("Projects seeded");
  return projects;
}

async function seedTasks(projects, users) {
  const employees = users.filter((user) => user.role === ROLES.EMPLOYEE);

  const tasks = await Task.insertMany([
    {
      title: "Create homepage UI",
      description: "Build responsive homepage components.",
      project: projects[0]._id,
      assignedUser: employees[0]._id,
      priority: TASKPRIORITY.HIGH,
      status: TASKSTATUS.INPROGRESS,
      dueDate: new Date("2026-06-16"),
    },
    {
      title: "Integrate client API",
      description: "Connect frontend client forms to backend API.",
      project: projects[0]._id,
      assignedUser: employees[1]._id,
      priority: TASKPRIORITY.MEDIUM,
      status: TASKSTATUS.PENDING,
      dueDate: new Date("2026-06-17"),
    },
    {
      title: "Prepare dashboard widgets",
      description: "Create project KPI and summary cards.",
      project: projects[1]._id,
      assignedUser: employees[2]._id,
      priority: TASKPRIORITY.MEDIUM,
      status: TASKSTATUS.PENDING,
      dueDate: new Date("2026-06-28"),
    },
    {
      title: "Setup auth module",
      description: "Implement JWT login and refresh token flow.",
      project: projects[2]._id,
      assignedUser: employees[0]._id,
      priority: TASKPRIORITY.HIGH,
      status: TASKSTATUS.COMPLETED,
      dueDate: new Date("2026-06-10"),
    },
    {
      title: "Build task comments API",
      description: "Allow employees to add comments on assigned tasks.",
      project: projects[2]._id,
      assignedUser: employees[1]._id,
      priority: TASKPRIORITY.HIGH,
      status: TASKSTATUS.INPROGRESS,
      dueDate: new Date("2026-06-14"),
    },
  ]);

  console.log("Tasks seeded");
  return tasks;
}

async function seed() {
  try {
    await connectDB();
    await clearData();

    const users = await seedUsers();
    const clients = await seedClients();
    const projects = await seedProjects(clients);
    await seedTasks(projects, users);

    console.log("Seeding completed successfully");
    console.log("Admin: admin@example.com / admin123");
    console.log("Employee: rahul@example.com / employee123");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
}

seed();
