export type RCResponse<T> = {
  Result: T | null;
  Description: string;
  ExceptionMessage: null | string;
  State: boolean;
};

export type LoginResult = {
  FullName: string;
  LocationId: number;
  LocationName: string;
  ProfileImage: string;
  OverBooking: string;
  EnableTAMM: boolean;
  EnableYoti: boolean;
  TAMMUserName: null | string;
  TAMMPassword: null | string;
  Enable3DS: boolean | null;
  Token: string;
  IsNonRevenue: boolean;
  IsVIVOPAY: boolean;
  VivoPayKey: null | string;
};

export type ProcessPaymentParams = {
  /**
   * False if the payment is a pre-authorization
   */
  isPayment: boolean;
  amount: number;
  cvv?: string;
  customerCreditCardId: number;
};

export type UpdateRentalResult = {
  RANumber: string;
  RentalId: number;
  TotalAmount: number;
  OldTotalAmount: number;
  DeferaceBalance: number;
  requiredFullPaymentAtCheckIn: boolean;
  QuoteCalculateDTO: QuoteCalculateDTO;
};

export type QuoteCalculateDTO = {
  RateId: number;
  IsCompanyRate: boolean;
  RateCode: string;
  DailyRate: number;
  HourlyRate: number;
  WeeklyRate: number;
  MonthlyRate: number;
  KmExceedRate: number;
  IncludedMileage: number;
  MinuteRate: number;
  KMAllowedDaily: number;
  KMAllowedWeekly: number;
  KMAllowedMonthly: number;
  ExtraDailyRate: number;
  Fuel: number;
  Propane: number;
  HourlyRateWithTaxes: number;
  DailyRateWithTaxes: number;
  WeeklyRateWithTaxes: number;
  MonthlyRateWithTaxes: number;
  PromocodeId: number;
  Promocode: null;
  rateOptionsIds: number[];
  QuoteCalculateCharge: QuoteCalculateCharge;
  ChargeSummary: string;
  ChargeSummaryDTO: ChargeSummaryDTO[];
};

export type ChargeSummaryDTO = {
  Charge: string;
  Rate: string;
  Tax: string;
  Total: string;
};

export type QuoteCalculateCharge = {
  NetTotal: number;
  SubTotal: number;
  TotalTaxes: number;
  TotalInsurances: number;
  TotalMischarges: number;
  TotalAmount: number;
  TotalTimeAndMileage: number;
  TotalBalance: number;
  TotalAmountWithTax: number;
  QuoteCalculateOptions: any[];
};

export type GetNumberOfRentalsResult = {
  NumberOfRentalsReturningToday: number;
  NumberOfRentals: number;
};

export type SearchRentalResult = Array<{
  RentalID: number;
  ReservationId: number;
  RANumber: string;
  PickUpDateTime: string;
  DropOffDateTime: string;
  IsPassed: boolean;
  RentalDate: string;
  NetRate: number;
  Taxes: null;
  Insurances: null;
  Misccharges: null;
  Memo: string;
  TotalAmount: number;
  CurrencyCode: string;
  IsCancelled: boolean;
  IsCheckedOut: boolean;
  IsCheckedIn: boolean;
  IsConfirmed: boolean;
  RateId: number;
  DailyRate: number;
  WeeklyRate: number;
  MonthlyRate: number;
  CustomerId: number;
  CustomerFirstName: string;
  CustomerLastName: string;
  CustomerMobileNumber: string;
  SSN: string;
  authorizedIdVersion: string;
  IsCredit: boolean;
  CustomerNotes: string;
  IsBusiness: boolean;
  TAMMAuthorizationNumber: null;
  FuelLevelOut: null;
  PropaneLevelOut: null;
  HourOut: null;
  FuelLevelOutPercentage: null;
  CustomerBalance: null;
  RequiredFullPaymentAtCheckIn: boolean;
  DeliveryAddress: string;
  CustomerLicenseNumber: string;
  CustomerLicenseExpiry: string;
  CompanyId: number;
  ReferralId: number;
  Location: Location;
  PickUpLocation: Location;
  DropOffLocation: Location;
  VehicleType: VehicleType;
  Vehicle: Vehicle;
  ChargesSummary: null;
  QuoteCalculateDTO: QuoteCalculateDTO;
  PONumber: null;
  RONumber: null;
  CheckOutChannel: null;
  PageCount: number;
  TotalObjectsCount: number;
}>;

export type Location = {
  LocationId: number;
  LocationName: string;
  LocationIndustry: string;
  ParentLocationPhone: string;
  LocationAddress: string;
  LocationCity: string;
  LocationState: string;
  LocationCountry: string;
  LocationPhone: string;
  LocationZip: string;
  LocationImage: string;
  LocationDescription: string;
  IsOffsiteLocation: boolean;
  OwningLocationId: number;
  RegionId: number;
  LocationEmail: string;
  ParentLocationEmail: string;
  CitySupportedName: string;
  LocationTypeApp: string;
  isPrivateProperty: boolean;
  PassCode: string;
  IsOneWay: string;
  OneWayType: null;
  ChargePerMile: number;
  MileageBuffer: number;
  CityId: number;
  LocationCurrentDateTime: string;
  LocationPoint: LocationBoundary1Class;
  LocationBoundary1: LocationBoundary1Class;
  LocationBoundary2: LocationBoundary1Class;
  LocationBoundary3: LocationBoundary1Class;
  LocationBoundary4: LocationBoundary1Class;
};

export type LocationBoundary1Class = {
  Longitude: number;
  Latitude: number;
};

export type Vehicle = {
  VehicleId: number;
  AssignedId: string;
  VehicleType: string;
  VehicleTypeId: number;
  vinNumber: string;
  MakeName: string;
  ModelName: string;
  VehicleName: string;
  VehicleOdometer: number;
  FuelLevel: string;
  PropaneLevel: string;
  HourOut: number;
  VehicleImage: string;
  LicenserNumber: string;
  YearMade: string;
  VehicleDescription: string;
  NumberOfSeats: string;
  color: string;
  DateEntered: string;
  PlateNumber: string;
  VehicleCalendar: null;
  Status: string;
  IsRentable: boolean;
  Transmission: string;
  PlateType: string;
  LocationId: number;
  CurrentLocationId: number;
  VehicleMemo: string;
  Rating: string;
  FuelType: string;
  VehicleAddress: string;
  Engine: number;
  PlateState: string;
  TankCapacity: string;
  Odometer: string;
  companyName: null;
  IsActive: string;
  insuranceType: null;
  PolicyNumber: null;
  PolicyAmount: null;
  DeductableAmount: null;
  Latitude: number;
  Longitude: number;
  PageCount: number;
  Type: null;
  TotalObjectsCount: number;
  InsuranceExpiryDate: null;
  PlateExpiry: string;
  Options: any[];
  lstVehicleImges: any[];
  lstVehicleInsuranceImages: any[];
  QuoteCalculates: any[];
};

export type VehicleType = {
  VehicleTypeId: number;
  VehicleTypeName: string;
  VehicleTypeImage: string;
  LocationId: number;
  NumberOfDoors: number;
  NumberOfBagsSmall: number;
  NumberOfBagsLarge: number;
  NumberOfSeats: number;
  Memo: string;
  NumberOfBeds: number;
  TotalNumberOfBags: number;
  MinimumAge: number;
  CurrentLocationId: number;
  CategoryId: number;
  Code: null;
  LocationType: null;
};

export type EndRentalResult = {
  RentalId: number;
  RaNumber: string;
  TotalAmount: number;
  LocationId: number;
  ReservationId: number;
  ResNumber: string;
  Km: number;
  Fuel: number;
  ContractUrl: string;
  AgreementSignID: string;
  ContarctType: string;
  AssignedId: string;
  DeviceState: DeviceState;
  PickUpDateTime: string;
  DropOffDateTime: string;
  ChargeSummary: null;
  QuoteCalculateDTO: QuoteCalculateDTO;
};

export type DeviceState = {
  Result: boolean;
  Description: null;
  ExceptionMessage: null;
  State: boolean;
};
