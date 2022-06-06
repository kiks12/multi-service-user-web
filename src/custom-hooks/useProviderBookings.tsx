import { createContext, useContext, useState } from "react";
import { Booking } from "../../types";
import authorizedFetch from "../../utils/authorizedFetch";
import { __backend__ } from "../constants";
import { useAccessToken } from "./useAccessToken";

interface contextType {
  acceptBookingInServer: (booking: Booking) => Promise<void>;
  setServiceToRenderedInServer: (booking: Booking) => Promise<void>;
  bookedServices: Booking[];
  setBookedServices: React.Dispatch<React.SetStateAction<Booking[]>>;
}

export const providerBookingContext = createContext<contextType>({
  acceptBookingInServer: () => Promise.resolve(),
  setServiceToRenderedInServer: () => Promise.resolve(), 
  bookedServices: [],
  setBookedServices: () => [],
});

export const ProviderBookingProvider : React.FC = ({ children }) => {

  const [bookedServices, setBookedServices] = useState<Booking[]>([]);
  const { accessToken } = useAccessToken();
  
  const acceptBookingInServer = async (booking: Booking) => {
    const res = await authorizedFetch({
        url: `${__backend__}/provider/bookings/accept-booking?bookId=${booking.bookId}`,
        accessToken: accessToken,
        method: 'PATCH',
    });

    if (res.status === 200) {
        setBookedServices(prev => {
            return prev.map((_booking: Booking) => {
                if (_booking.bookId === booking.bookId) {
                    return res.booking;
                }

                return _booking;
            })
        })

        return;
    } 

    alert(res.msg);
  }

  const setServiceToRenderedInServer = async (booking: Booking) => {
    const res = await authorizedFetch({
        url: `${__backend__}/provider/bookings/service-rendered?bookId=${booking.bookId}`,
        accessToken: accessToken,
        method: 'PATCH',
    });

    if (res.status === 200) {
        setBookedServices(prev => {
            return prev.map((_booking: Booking) => {
                return _booking.bookId === booking.bookId ? res.booking : _booking;
            })
        })
    }
  }

  return (
    <providerBookingContext.Provider value={{
        acceptBookingInServer,
        setServiceToRenderedInServer,
        bookedServices,
        setBookedServices
      }}>
      {children}
    </providerBookingContext.Provider>
  )
}

export const useProviderBookings = () => {
  return useContext(providerBookingContext);
}
