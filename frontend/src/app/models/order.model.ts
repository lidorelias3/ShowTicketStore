export interface Order {
    _id: string
    userId: string;
    eventId: string;
    createdAt: Date;

    tickets: Array<{ ticketType: string; quantity: number }>;
    totalPrice: number;
  }