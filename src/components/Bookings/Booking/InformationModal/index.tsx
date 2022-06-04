import React, { useMemo } from "react";

import Modal from "../../../Modals/Modal";

import type { Booking } from "../../../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { formatter } from "../../../../../utils/formatter";
import useClickOutsideElement from "../../../../custom-hooks/useClickOutsideElement";

interface props {
  booking: Booking;
  setOpenInformationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCancelModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BookingInformationModal: React.FC<props> = ({ booking, setOpenInformationModal, setOpenCancelModal }) => {
  const modalRef = useClickOutsideElement(() => setOpenInformationModal(false));

  const formattedPrice = useMemo(() => {
    return formatter.format(booking.price);
  }, [booking]);

  const formattedFinalPrice = useMemo(() => {
    return formatter.format(booking.finalPrice);
  }, [booking]);

  const openCancelModal = () => {
    setOpenCancelModal(true);
    setOpenInformationModal(false);
  }

  return (
    <Modal>
      <div className="card" ref={modalRef}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Booking Information</h2>
          <FontAwesomeIcon icon={faClose} onClick={() => setOpenInformationModal(false)} />
        </div>
        <table style={{ width: "100%", margin: "1em 0 0 0" }}>
          <tbody>
            <tr>
              <td>Service: </td>
              <td>{booking.Service.title}</td>
            </tr>
            <tr>
              <td>Date: </td>
              <td>{booking.date}</td>
            </tr>
            <tr>
              <td>Time: </td>
              <td>{booking.time}</td>
            </tr>
            <tr>
              <td>Payment Method: </td>
              <td>{booking.paymentMethod}</td>
            </tr>
            <tr>
              <td>Price: </td>
              <td>{formattedPrice}</td>
            </tr>
            <tr>
              <td>Pax: </td>
              <td>{booking.pax}</td>
            </tr>
            <tr>
              <td>Total Price: </td>
              <td>{formattedFinalPrice}</td>
            </tr>
            <tr>
              <td>Booking Status: </td>
              <td>{booking.status}</td>
            </tr>
            <tr>
              <td>Payment Status: </td>
              <td>
                <div>
                  <input type="checkbox" checked={booking.paid} readOnly />
                  <label>{booking.paid ? "Paid" : "Not Yet Paid"}</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>Provider: </td>
              <td>{booking.ServiceProviders.shopName}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <button 
            disabled={booking.status !== "To be Approved"}
            onClick={openCancelModal}
          >
            Cancel Booking
          </button>
          <button onClick={() => setOpenInformationModal(false)}>Okay</button>
        </div>
      </div>
    </Modal>
  );
};

export default BookingInformationModal;
