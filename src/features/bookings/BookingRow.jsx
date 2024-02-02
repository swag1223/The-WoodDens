import { useNavigate } from "react-router-dom";
import {
	HiArrowDownOnSquare,
	HiArrowUpOnSquare,
	HiEye,
	HiTrash,
} from "react-icons/hi2";
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import useCheckout from "../check-in-out/useCheckout";
import useDeleteBooking from "./useDeleteBooking";

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 500;
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

const Amount = styled.div`
	font-family: "Sono";
	font-weight: 500;
`;

const BookingRow = ({
	booking: {
		id: bookingId,
		created_at,
		startDate,
		endDate,
		numOfNights,
		numOfGuests,
		totalPrice,
		status,
		guests: { fullName: guestName, email },
		cabins: { name: cabinName },
	},
}) => {
	const navigate = useNavigate();
	const { checkout, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeletingBooking } = useDeleteBooking();

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<Table.Row>
			<Cabin>{cabinName}</Cabin>

			<Stacked>
				<span>{guestName}</span>
				<span>{email}</span>
			</Stacked>

			<Stacked>
				<span>
					{isToday(new Date(startDate))
						? "Today"
						: formatDistanceFromNow(startDate)}{" "}
					&rarr; {numOfNights} night stay
				</span>
				<span>
					{format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
					{format(new Date(endDate), "MMM dd yyyy")}
				</span>
			</Stacked>

			<Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

			<Amount>{formatCurrency(totalPrice)}</Amount>

			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle clickedMenuId={bookingId} />
						<Menus.List clickedMenuId={bookingId}>
							<Menus.ListItem
								icon={<HiEye />}
								onClick={() => navigate(`/bookings/${bookingId}`)}
							>
								See Details
							</Menus.ListItem>

							{status === "unconfirmed" && (
								<Menus.ListItem
									icon={<HiArrowDownOnSquare />}
									onClick={() => navigate(`/checkin/${bookingId}`)}
								>
									Check in
								</Menus.ListItem>
							)}

							{status === "checked-in" && (
								<Menus.ListItem
									icon={<HiArrowUpOnSquare />}
									disabled={isCheckingOut}
									onClick={() => {
										checkout(bookingId);
									}}
								>
									Check out
								</Menus.ListItem>
							)}
							<Modal.Open opens="deleteBooking">
								<Menus.ListItem icon={<HiTrash />}>Delete</Menus.ListItem>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name="deleteBooking">
							<ConfirmDelete
								resourceName="bookings"
								disabled={isDeletingBooking}
								onConfirm={() => deleteBooking(bookingId)}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</div>
		</Table.Row>
	);
};

export default BookingRow;
