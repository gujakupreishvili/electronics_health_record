import {
  updateHealthCard,
  updateDoctorInformation,
  updatePatientInformation,
} from "./dbUpdate";
import { readData } from "./dbRead";
import {
  dbDeleteDoctor,
  dbDeletePatientHistoryItem,
  dbDeletePatient,
} from "./dbDelete";
import {
  dbCreateDoctor,
  dbCreateHealthCard,
  dbCreatePatient,
} from "./dbCreate";

export {
  updateHealthCard,
  readData,
  dbDeleteDoctor,
  dbDeletePatientHistoryItem,
  dbDeletePatient,
  updateDoctorInformation,
  updatePatientInformation,
  dbCreateDoctor,
  dbCreateHealthCard,
  dbCreatePatient,
};
