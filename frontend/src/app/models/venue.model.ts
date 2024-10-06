export interface Venue {
  _id? : string;
  name: string;
  location: {
    address: string,
    city: string,
    state: string,
    country: string, 
  };
  maxCapacity: number;
  zones: Array<{ name: string, capacity: number }>;
}
