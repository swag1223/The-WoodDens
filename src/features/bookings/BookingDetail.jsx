import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

import BookingDataBox from "./BookingDataBox";
import useGetBooking from "./useGetBooking";
import useDeleteBooking from "./useDeleteBooking";

import useCheckout from "../check-in-out/useCheckout";
import { useMoveBack } from "../../hooks/useMoveBack";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

const BookingDetail = () => {
	const { booking, isLoading } = useGetBooking();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeletingBooking } = useDeleteBooking();

	const moveBack = useMoveBack();
	const navigate = useNavigate();

	if (isLoading) return <Spinner />;
	if (!booking) return <Empty resourceName="Bookings" />;

	const { status, id: bookingId } = booking;
	// console.log(booking);

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingId}</Heading>
					<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>
						Check in
					</Button>
				)}

				{status === "checked-in" && (
					<Button disabled={isCheckingOut} onClick={() => checkout(bookingId)}>
						Check out
					</Button>
				)}

				<Modal>
					<Modal.Open opens="deleteBooking">
						<Button $variation="danger" disabled={isDeletingBooking}>
							{" "}
							Delete Booking{" "}
						</Button>
					</Modal.Open>
					<Modal.Window name="deleteBooking">
						<ConfirmDelete
							resourceName="bookings"
							disabled={isDeletingBooking}
							onConfirm={() =>
								deleteBooking(bookingId, {
									onSettled: () => navigate(-1),
								})
							}
						/>
					</Modal.Window>
				</Modal>

				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default BookingDetail;
