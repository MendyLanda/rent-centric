import { RentalService } from "./routes/rental";
import { type RCResponse, type LoginResult } from "./types";

type ConfigParams = {
  email: string;
  password: string;
  activationCode: string;
};

export class RentCentricApiClient {
  private baseUrl: string =
    "https://www7.rentcentric.com/Client6151/CarShareSelfServiceApi/api";
  public user: LoginResult | null = null;

  public rental: RentalService;

  private constructor(private config: ConfigParams) {
    this.rental = new RentalService(this);
  }

  static async createInstance(config: ConfigParams) {
    const client = new RentCentricApiClient(config);
    await client.login();
    return client;
  }

  private async login() {
    const response = await fetch(`${this.baseUrl}/Token/MobileAgentLogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.config),
    });

    const data = (await response.json()) as RCResponse<LoginResult>;
    if (data.State && data.Result) {
      this.user = data.Result;
    } else {
      throw new Error(`Rent Centric Error: ${data.Description}`);
    }
  }

  /**
   * Formats a date to "mm\\/dd\\/yyyy hh:mm AM/PM" as expected by Rent Centric
   */
  public formatDate(date: Date) {
    const str = date.toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return str.replace(/\//g, "\\/");
  }

  private getBodyParams(params: Record<string, any> | undefined) {
    // formats a dictionary to a string of key=value pairs
    if (!params) return;

    for (const key of Object.keys(params)) {
      if (params[key] instanceof Date) {
        params[key] = this.formatDate(params[key]);
      }
    }

    params["adminId"] = this.config.email;

    return JSON.stringify(params);
  }

  public async caller<T = unknown>(
    endpoint: string,
    options: Omit<RequestInit, "body"> & { body?: object }
  ) {
    if (!this.user) {
      throw new Error(
        "No bearer token set. Please login first using the createInstance method"
      );
    }

    const defaultHeaders = {
      Host: "www7.rentcentric.com",
      Accept: "*/*",
      AppName: "MobileAgent",
      AppVersion: "2.0.3",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
      Platform: "IOS",
      "Content-Type": "application/json",
      "User-Agent": "Mobile Agent Pro/2 CFNetwork/1494.0.7 Darwin/23.4.0",
      Authorization: `Bearer ${this.user.Token}`,
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        body: this.getBodyParams(options.body),
        headers: {
          ...options.headers,
          ...defaultHeaders,
        },
      });
      if (!response.ok) {
        console.log(response);
        throw new Error(
          `Unexpected response from Rent Centric: ${response.status} ${response.statusText}`
        );
      }

      const responseData = (await response.json()) as RCResponse<T>;
      if (!responseData.State) {
        throw new Error(`Rent Centric Error: ${responseData.Description}`);
      }

      return responseData;
    } catch (error) {
      throw new Error(`Unexpected error calling ${endpoint}: ${error}`);
    }
  }
}
