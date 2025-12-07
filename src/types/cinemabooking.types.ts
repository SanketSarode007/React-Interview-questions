
export interface CinemaSeatBookingProps {
    layout: layoutProps;
    seatTypes: seatTypesProps
    bookedSeats: string[]
    currency: string
    onBookingComplete: (summary: BookingSummary) => void; 
    title: string,
    Subtitle: string
}

export interface BookingSummary {
    seats: seatRowObject[];
    totalPrice: number;
    seatIds: string[];
}


export interface layoutProps {
    rows: number,
    seatPerRows: number,
    aislePosition: number
}

export interface seatTypesProps {
    regular: seatTypeObject;
    premium: seatTypeObject;
    vip: seatTypeObject;
}

export interface seatTypeObject {
    name: string,
    price: number,
    rows: number[],
}

export interface seatRowType {

}

export interface seatTypeInfoObject {
    type: string,
    price: number,
    color: SeatColor
}

export type SeatColor =
    | "blue"
    | "purple"
    | "yellow"
    | "red"
    | "green"
    | "indigo"
    | "pink"
    | "gray";


export interface seatRowObject {
    id: string,
    row: number,
    seat: number,
    type: string,
    price: number,
    color: SeatColor,
    status: string,
    selected: boolean
}
