import { Application } from "express";
import routes from "../utils/constants/routes.json";
import usersNetwork from "../network/usersNetwork";
import groupsNetwork from "../network/groupsNetwork";
import groupsMembersNetwork from "../network/groupsMembersNetwork";
import expensesNetwork from "../network/expensesNetwork";
import expensesSplitsNetwork from "../network/expensesSplitsNetwork";

function router(server: Application) {
  server.use(routes.users, usersNetwork);
  server.use(routes.groups, groupsNetwork);
  server.use(routes.groupsMembers, groupsMembersNetwork);
  server.use(routes.expenses, expensesNetwork);
  server.use(routes.expensesSplits, expensesSplitsNetwork);
}

export default router;
