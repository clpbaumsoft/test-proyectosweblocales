import mitt, { Emitter } from "mitt";

import { Employee, Visitor } from "@/interfaces/Models";

type EventVisitorUpdateType = {
  update_visitor: Visitor;
}

type EventEmployeeUpdateType = {
  update_employee: Employee;
}

const emitterUpdateVisitor: Emitter<EventVisitorUpdateType> = mitt<EventVisitorUpdateType>();
const emitterUpdateEmployee: Emitter<EventEmployeeUpdateType> = mitt<EventEmployeeUpdateType>();

const EntryControlEvents = {
  updateVisitor: emitterUpdateVisitor,
  updateEmployee: emitterUpdateEmployee,
}
export default EntryControlEvents