//Services
import AuthService from "./Auth";
import ArlCompanyService from "./ArlCompany";
import CareCompanyService from "./CareCompany";
import CityService from "./City";
import CompanyService from "./Company";
import DocumentTypeService from "./DocumentType";
import EmployeeService from "./Employee";
import EntryService from "./Entry";
import EntryVehicleService from "./EntryVehicle";
import EntryEmployeeService from "./EntryEmployee";
import GateService from "./Gate";
import IdentificationTypeService from "./IdentificationType";
import MediaService from "./Media";
import UserService from "./User";
import VehicleInspectPointService from "./VehicleInspectPoint";
import VehicleTypeService from "./VehicleType";
import VisitService from "./Visit";
import VisitorTypeService from "./VisitorType";
import VisitorService from "./Visitor";
import VisitDocumentService from "./VisitDocument";
import VisitVisitorService from "./VisitVisitor";
import VisitToOtherBranchService from "./VisitToOtherBranch";
import RestrictecUsersService from "./RestrictedUsers";
import GenerateReportsService from "./GenerateReports";

const Orchestra = {
  authService: new AuthService(),
  arlCompanyService: new ArlCompanyService(),
  careCompanyService: new CareCompanyService(),
  cityService: new CityService(),
  companyService: new CompanyService(),
  documentTypeService: new DocumentTypeService(),
  employeeService: new EmployeeService(),
  entryService: new EntryService(),
  entryEmployeeService: new EntryEmployeeService(),
  entryVehicleService: new EntryVehicleService(),
  gateService: new GateService(),
  identificationTypeService: new IdentificationTypeService(),
  mediaService: new MediaService(),
  userService: new UserService(),
  vehicleInspectPointService: new VehicleInspectPointService(),
  vehicleTypeService: new VehicleTypeService(),
  visitService: new VisitService(),
  visitToOtherBranchService: new VisitToOtherBranchService(),
  visitorTypeService: new VisitorTypeService(),
  visitorService: new VisitorService(),
  visitDocumentService: new VisitDocumentService(),
  visitVisitorService: new VisitVisitorService(),
  restrictecUsersService: new RestrictecUsersService(),
  
  generateReportsService: new GenerateReportsService(),
}
export default Orchestra