import { DependencyLocator } from "./dependenciesLocator";
import Database from "../prisma/prisma";
import Users from "../../models/users";
import { PrismaClient } from "@prisma/client";
import Groups from "../../models/groups";
import GroupsMembers from "../../models/groupsMembers";
import Expenses from "../../models/expenses";
import ExpensesSplits from "../../models/ExpensesSplits";

const di = DependencyLocator.getInstance();

const types = {
  //   expenses: "expenses",
  prisma: "prisma",
  groups: "groups",
  users: "users",
  groupsMembers: "groupsMembers",
  expenses: "expenses",
  expensesSplits: "expensesSplits",
};

function initial() {
  const prisma = Database.getInstance().prisma;
  di.bindLazySingleton(types.prisma, () => prisma);
  di.bindLazySingleton(types.users, () => new Users(getPrisma()));
  di.bindLazySingleton(types.groups, () => new Groups(getPrisma()));
  di.bindLazySingleton(
    types.groupsMembers,
    () => new GroupsMembers(getPrisma())
  );
  di.bindLazySingleton(types.expenses, () => new Expenses(getPrisma()));
  di.bindLazySingleton(
    types.expensesSplits,
    () => new ExpensesSplits(getPrisma())
  );
}

export function getPrisma(): PrismaClient {
  return di.get(types.prisma);
}
export function getUsers(): Users {
  return di.get(types.users);
}
export function getGroups(): Groups {
  return di.get(types.groups);
}
export function getGroupsMembers(): GroupsMembers {
  return di.get(types.groupsMembers);
}

export function getExpenses(): Expenses {
  return di.get(types.expenses);
}
export function getExpensesSplits(): ExpensesSplits {
  return di.get(types.expensesSplits);
}

export default initial;
