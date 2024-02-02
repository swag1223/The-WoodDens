import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import useCheckin from "./useCheckin";
import useGetBooking from "../bookings/useGetBooking";
import useGetSettings from "../settings/useGetSettings";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

const CheckinBooking = () => {
	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const { booking, isLoading } = useGetBooking();
	const { settings, isLoading: isLoadingSettings } = useGetSettings();
	const moveBack = useMoveBack();
	const { checkin, isCheckingIn } = useCheckin();

	useEffect(() => {
		setConfirmPaid(booking?.isPaid ?? false);
	}, [booking]);

	if (isLoading || isLoadingSettings) return <Spinner />;

	const {
		id: bookingId,
		guests,
		totalPrice,
		numOfGuests,
		hasBreakfast,
		numOfNights,
	} = booking;
	const optionalBreakfastPrice =
		settings.breakfastPrice * numOfNights * numOfGuests;

	const handleCheckin = () => {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingId,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingId, breakfast: {} });
		}
	};

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingId}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={booking} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((val) => !val);
							setConfirmPaid(false);
						}}
						id="breakfast"
					>
						Want to add breakfast for {optionalBreakfastPrice}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() => setConfirmPaid((confirm) => !confirm)}
					id="confirm"
					disabled={confirmPaid || isLoadingSettings}
				>
					I confirm that {guests.fullName} has paid the total amount of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(
								totalPrice + optionalBreakfastPrice
						  )} (${formatCurrency(totalPrice)} +
								${formatCurrency(optionalBreakfastPrice)})`}{" "}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
					Check in booking #{bookingId}
				</Button>
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
};

export default CheckinBooking;
