import React, { useMemo, useState } from "react";
import { CinemaSeatBookingProps, seatRowObject, seatTypeInfoObject, seatTypesProps } from "../../types/cinemabooking.types"

export const CinemaSeatBooking: React.FC<CinemaSeatBookingProps> = ({
    layout = {
        rows: 8,
        seatPerRows: 12,
        aislePosition: 5
    },
    seatTypes = {
        regular: { name: 'Regular', price: 150, rows: [0, 1, 2] },
        premium: { name: 'Premium', price: 250, rows: [3, 4, 5] },
        vip: { name: 'VIP', price: 350, rows: [6, 7] }
    },
    bookedSeats,
    currency = '',
    onBookingComplete = ( ) => { },
    title,
    Subtitle,
}) => {

    const colors = [
        "blue",
        "purple",
        "yellow",
        "green",
        "red",
        "indigo",
        "pink"
    ]

    function getSeatType(row: number): seatTypeInfoObject {
        const seatTypesEntries = Object.entries(seatTypes)

        for (let i = 0; i < seatTypesEntries.length; i++) {
            const [type, config] = seatTypesEntries[i]

            if (config.rows.includes(row)) {
                const color = colors[i % colors.length]
                return { type, color, ...config }
            }
        }

        const [firstType, firstConfig] = seatTypesEntries[0]
        return { type: firstType, color: colors[0], ...firstConfig }
    }

    const initializeSeats = useMemo(() => {

        const seats = [];
        for (let row = 0; row < layout.rows; row++) {
            const seatRow: seatRowObject[] = [];
            const seatTypeInfo: seatTypeInfoObject = getSeatType(row)

            for (let seat = 0; seat < layout.seatPerRows; seat++) {
                const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`

                seatRow.push({
                    id: seatId,
                    row,
                    seat,
                    type: seatTypeInfo?.type || 'regular',
                    price: seatTypeInfo?.price || 150,
                    color: seatTypeInfo?.color || 'blue',
                    status: bookedSeats?.includes(seatId) ? 'Booked' : 'Avaliable',
                    selected: false
                })
            }
            seats.push(seatRow)
        }

        return seats

    }, [layout, seatTypes, bookedSeats])

    const [seats, setSeats] = useState(initializeSeats);
    const [selectedSeats, setSelectedSeats] = useState<seatRowObject[]>([])

    function handleSeatClick(rowIndex: number, seatIndex: number) {
        const seat = seats[rowIndex][seatIndex];
        if (seat.status === "booked") return

        const isCurrentlySelected = seat.selected;

        setSeats((prevSeats) => {
            return prevSeats.map((row, rIdx) =>
                row.map((s, sIdx) => {
                    if (rIdx === rowIndex && sIdx === seatIndex) {
                        return { ...s, selected: !s.selected }
                    }
                    return s;
                }))
        })

        if (isCurrentlySelected) {
            setSelectedSeats((prev) => prev.filter((s) => s.id !== seat.id))
        } else {
            setSelectedSeats((prev) => [...prev, seat])
        }
    }

    const colorMap = {
        blue: 'bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200',
        purple: 'bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200',
        yellow: 'bg-yellow-100 border-yellow-300 text-yellow-800 hover:bg-yellow-200',
        red: 'bg-red-100 border-red-300 text-red-800 hover:bg-red-200',
        green: 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200',
        indigo: 'bg-indigo-100 border-indigo-300 text-indigo-800 hover:bg-indigo-200',
        pink: 'bg-pink-100 border-pink-300 text-pink-800 hover:bg-pink-200',
        gray: 'bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200'
    }

    function getColorClass(colorName: keyof typeof colorMap) {
        return colorMap[colorName] || colorMap.blue
    }

    function getSeatClassName(seat: seatRowObject) {
        const baseClass = "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 cursor-pointer transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold bg-blue-100 border-blue-300 text-blue-800"

        if (seat.status === 'Booked') {
            return `${baseClass} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`
        }

        if (seat.selected) {
            return `${baseClass} bg-green-500 border-green-500 text-white transform scale-110`
        }

        return `${baseClass} ${getColorClass(seat.color)}`
    }

    function renderSeatSection(seatRow: seatRowObject[], startIndex: number, endIndex: number) {
        return (
            <div className="flex">
                {seatRow.slice(startIndex, endIndex).map((seat: seatRowObject, index: number) => {
                    return <div className={getSeatClassName(seat)} key={seat.id} onClick={() => handleSeatClick(seat.row, startIndex + index)}>
                        {startIndex + index + 1}
                    </div>
                })}
            </div>
        )
    }

    const uniqueSeatTypes = Object.entries(seatTypes).map(([type, config], index) => {
        return {
            type,
            color: colors[index % colors.length],
            ...config
        }
    })

    function getTotalPrice() {
        return selectedSeats.reduce((total, seat) => total + seat.price, 0)
    }

    function handleBooking() {
        if (selectedSeats.length === 0) {
            alert("Please select at least one seat")
        }

        setSeats((prevSeats) => {
            return prevSeats.map((row) =>
                row.map((seat) => {
                    if (selectedSeats.some((selected) => selected.id === seat.id)) {
                        return { ...seat, status: "Booked", selected: false }
                    }
                    return seat;
                }))
        })

        onBookingComplete({
            seats: selectedSeats,
            totalPrice: getTotalPrice(),
            seatIds: selectedSeats.map((seat) => seat.id)
        })
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4">
            {/* title */}
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">{title}</h1>
                <p className="text-center text-gray-500 mb-6">{Subtitle}</p>

                {/* Screen */}
                <div className="mb-8">
                    <div className="w-full h-4 rounded-lg bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 mb-2 shadow-inner"></div>
                    <p className="text-center text-sm text-gray-500 font-medium">SCREEN</p>
                </div>

                {/* Seat Map */}
                <div className="mb-6 overflow-x-auto">
                    <div className="flex flex-col items-center">
                        {
                            seats?.map((row, rowIndex) => {
                                return (
                                    <div key={rowIndex} className="flex items-center mb-2">
                                        <span className="w-8 text-center font-bold text-gray-600 mr-4">
                                            {String.fromCharCode(65 + rowIndex)}
                                        </span>
                                        {renderSeatSection(row, 0, layout.aislePosition)}
                                        {/* aisle */}
                                        <div className="w-8"></div>
                                        {renderSeatSection(row, layout.aislePosition, layout.seatPerRows)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

            </div>


            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                {uniqueSeatTypes.map((seatType) => {
                    return <div key={seatType.type} className="flex items-center">
                        <div className={`w-6 h-6 border-2 rounded-t-lg mr-2
                             ${getColorClass(seatType.color) || "bg-blue-100 border-blue-300"}`}>
                        </div>
                        <span className="text-sm">
                            {seatType.name} ({currency}{seatType.price})
                        </span>
                    </div>
                })}

                <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 border-green-600 rounded-t-lg mr-2 "></div>
                    <span className="text-sm">Selected</span>
                </div>
                <div className="flex items-center">
                    <div className="w-6 h-6 bg-gray-400 border-gray-500 rounded-t-lg mr-2 "></div>
                    <span className="text-sm">Selected</span>
                </div>
            </div>
            {/*Booking Summary */}
            <div className="bg-gray-300 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-lg mb-2">Booking Summary</h3>

                {selectedSeats.length > 0 ? (
                    <div>
                        <p className="mb-2">
                            Selected Seats: {""}
                            <span className="font-medium">
                                {selectedSeats.map((s) => s.id).join(", ")}
                            </span>
                        </p>
                        <p className="text-xl font-bold text-green-600">
                            Total: {currency}
                            {getTotalPrice()}
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-500">No seats selected</p>
                )
                }
            </div>
            <div></div>
            {/* Book Button */}

            <button onClick={handleBooking} disabled={selectedSeats.length === 0}
                className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all duration-200
             ${selectedSeats.length > 0 ?
                        "bg-green-500 hover:bg-green-600 text-white transform hover:scale-105" :
                        "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                {selectedSeats.length > 0 ? `Book ${selectedSeats.length} Seat(s) - ${currency}${getTotalPrice()}`
                    : `Select Seats to Book`}
            </button>
        </div>
    )
}
