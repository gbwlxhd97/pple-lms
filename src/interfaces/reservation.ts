interface ITime {
  time: string;
  able: boolean;
}

export interface IReservation {
  am: Array<ITime>;
  pm: Array<ITime>;
}
