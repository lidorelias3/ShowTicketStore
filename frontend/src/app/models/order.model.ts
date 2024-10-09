export interface Order {
  _id: string;
  userId: string;
  eventId: string;
  tickets: Array<{ ticketType: string; quantity: number }>;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
