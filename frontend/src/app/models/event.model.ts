export interface Event {
  _id?: string;
  name: string;
  date: Date;

  venueName: string;
  tickets: Array<{ ticketType: string; price: number }>;
  minimumAge: number;

  description: string;
  profileImage: string;
  imagesPaths: Array<{ path: string; description: string }>;
  weather?: {temp: number, code: string};
}
