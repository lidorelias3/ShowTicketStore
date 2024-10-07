export interface Order {
    userId: string;
    eventId: string;
    createdAt: Date;

    tickets: Array<{ ticketType: string; quantity: number }>;
    totalPrice: number;
  }