export const dropDatabase = async (prisma) => {
  await prisma.assigneesOnTask.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.project.deleteMany();
  await prisma.tenantsToUsers.deleteMany();
  await prisma.tenant.deleteMany();
  await prisma.user.deleteMany();
};
