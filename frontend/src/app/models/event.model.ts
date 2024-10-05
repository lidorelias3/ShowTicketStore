export interface Event {
  name: string;
  date: Date;

  venueName: string;
  tickets: Array<{ ticketType: string; price: number }>;
  minimumAge: number;

  description: string;
  profileImage: string;
  imagesPaths: Array<{ path: string; description: string }>;
}
