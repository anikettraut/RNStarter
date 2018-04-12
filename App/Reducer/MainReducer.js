import { combineReducers } from "redux";
import LoginReducer from "../Components/LoginComponent/LoginReducer";
import PropertyListingReducer from "../Components/PropertyListComponent/PropertyListingReducer";
import FilterReducer from "../Components/FilterComponent/FilterReducer";
import SavedSearchesReducer from "../Components/SavedSearchesComponent/SavedSearchesReducer";
import PropertyDetailReducer from "../Components/PropertyDetailComponent/PropertyDetailReducer";

import RentalResumeMenuReducer from "../Components/RentalResumeComponent/RentalResumeMenu/RentalResumeMenuReducer";

import GeneralInfoReducer from "../Components/RentalResumeComponent/GeneralInfoScreen/GeneralInfoReducer";
import OtherInformationReducer from "../Components/RentalResumeComponent/OtherInformationComponent/OtherInformationReducer";
import PetsReducer from "../Components/RentalResumeComponent/PetsComponent/PetsReducer";
import CurrentAddressReducer from "../Components/RentalResumeComponent/CurrentAddressComponent/CurrentAddressReducer";
import PreviousResidentialAddressReducer from "../Components/RentalResumeComponent/PreviousResidentialAddressComponent/PreviousResidentialAddressReducer";
import EmploymentHistoryReducer from "../Components/RentalResumeComponent/EmploymentHistoryComponent/EmploymentHistoryReducer";
import PreviousEmploymentReducer from "../Components/RentalResumeComponent/PreviousEmploymentDetailsComponent/PreviousEmploymentReducer";

import IdentificationDocReducer from "../Components/RentalResumeComponent/IdentificationDocComponent/IdentificationDocReducer";
import SupportiveDocReducer from "../Components/RentalResumeComponent/SupportiveDocComponent/SupportiveDocReducer";
import ContactReferenceReducer from "../Components/RentalResumeComponent/ContactReferenceComponent/ContactReferenceReducer";

import BiddingStatusListingReducer from "../Components/BiddingStatuscomponent/BiddingStatusListing/BiddingStatusListingReducer";
import BiddingStatusDetailReducer from "../Components/BiddingStatuscomponent/BiddingStatusDetail/BiddingStatusDetailReducer";

import WeatherUpdatesReducer from "../Components/WeatherUpdatesComponent/WeatherUpdatesReducer";

import ChangePasswordReducer from "../Components/ChangePasswordComponent/ChangePasswordReducer";

import TransactionReducer from "../Components/Transactions/TransactionReducer";
import PropertyInspectionReducer from "../Components/PropertyInspection/PropertyInspectionReducer";

export default combineReducers({
  loginReducer: LoginReducer,
  propertyListingReducer: PropertyListingReducer,
  filterReducer: FilterReducer,

  propertyDetailReducer: PropertyDetailReducer,

  savedSearchesReducer: SavedSearchesReducer,

  rentalResumeMenuReducer: RentalResumeMenuReducer,

  generalInfoReducer: GeneralInfoReducer,
  otherInformationReducer: OtherInformationReducer,
  petsReducer: PetsReducer,
  currentAddressReducer: CurrentAddressReducer,
  previousResidentialAddressReducer: PreviousResidentialAddressReducer,
  employmentHistoryReducer: EmploymentHistoryReducer,
  previousEmploymentReducer: PreviousEmploymentReducer,

  identificationDocReducer: IdentificationDocReducer,
  supportiveDocReducer: SupportiveDocReducer,
  contactReferenceReducer: ContactReferenceReducer,

  weatherUpdatesReducer: WeatherUpdatesReducer,

  biddingStatusListingReducer: BiddingStatusListingReducer,
  biddingStatusDetailReducer: BiddingStatusDetailReducer,

  changePasswordReducer: ChangePasswordReducer,
  transactionReducer: TransactionReducer,
  propertyInspectionReducer: PropertyInspectionReducer
});
