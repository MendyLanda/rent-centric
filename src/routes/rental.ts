import { RentCentricApiClient } from "../client";
import {
  type EndRentalResult,
  type GetNumberOfRentalsResult,
  type ProcessPaymentParams,
  type SearchRentalResult,
  type UpdateRentalResult,
} from "../types";

export type StartRentalParams = {
  odometerOut: number;
  pickUpDateTime: Date;
  dropOffDateTime: Date;
  /**
   * Fuel level 0-16 when the vehicle is picked up
   */
  fuelOut?: number;
  propaneOut?: number;
  agreementFormId?: number;
  reservationId: number;
  referralId?: number;
  TAMMAuthorizationNumber?: string;
  hourOut?: number;
  manualFuel?: number;
  isDamaged?: boolean;
  poNumber?: string;
  manualOdometer?: number;
  roNumber?: string;
  isReturnOnlyBalance?: boolean;
  damageValue?: number;
  memo?: string;
};

export type UpdateRentalParams = {
  rentalId: number;
  dropOffDateTime: Date;
} & Partial<Omit<StartRentalParams, "pickUpDateTime" | "reservationId">>;

export type ProcessRentalPaymentParams = ProcessPaymentParams & {
  rentalId: number;
};

export type EndRentalParams = {
  rentalId: number;
  manualOdometer: number;
  hourIn?: number;
  /**
   * Fuel level 0-16 when the vehicle is dropped off
   */
  fuelIn: number;
  dropOffDateTime: Date;
  agreementFormId?: number;
  propaneIn?: number;
  damages?: boolean;
  isCarClean?: boolean;
  extraMiscChargesIDs?: number[];
};

export type SearchRentalParams = {
  isCancelled?: boolean;
  isReturningToday?: boolean;
  pageNumber?: number;
  locationId?: number;
  isCheckedIn?: boolean;
  email?: string;
  lastName?: string;
  rentalId?: number;
  /**
   * Reservation Agreement Number
   * This is what you see on rent centric website as the reservation number
   */
  raNumber?: string;
  customerLicenseNumber?: string;
  assignedId?: string;
  phoneNumber?: string;
  plateNumber?: string;
  firstName?: string;
};

export class RentalService {
  constructor(private client: RentCentricApiClient) {}

  async start(params: StartRentalParams) {
    return this.client.caller("/Rental/MobileAgentStartRental", {
      method: "POST",
      body: params,
    });
  }

  async update(params: UpdateRentalParams) {
    return this.client.caller<UpdateRentalResult>(
      "/Rental/MobileAgentUpdateRental",
      {
        method: "POST",
        body: params,
      }
    );
  }

  async processPayment(params: ProcessPaymentParams) {
    return this.client.caller<undefined>("/Rental/ProcessRentalPayment", {
      method: "POST",
      body: params,
    });
  }

  async end(params: EndRentalParams) {
    return this.client.caller<EndRentalResult>("/Rental/MobileAgentEndRental", {
      method: "POST",
      body: params,
    });
  }

  async getNumberOfRentals(locationId: number) {
    return this.client.caller<GetNumberOfRentalsResult>(
      `/Rental/GetNumberOfRentals?locationId=${locationId}`,
      {
        method: "GET",
      }
    );
  }

  async search(params: SearchRentalParams) {
    return this.client.caller<SearchRentalResult>(
      "/Rental/MobileAgentGetRentalsWithPaging",
      {
        method: "POST",
        body: params,
      }
    );
  }
}
