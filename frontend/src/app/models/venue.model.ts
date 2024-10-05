export interface Venue {
  _id? : string;
  name: string;
  location: {
    address: string, // Street address
    city: string, // City
    state: string, // State/Province
    country: string, // Country
  },
  maxCapacity: number, // Seating capacity
  zones: [
    {
      name: string,
      capacity: number
    }
  ],
}
