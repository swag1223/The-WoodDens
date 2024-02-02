import styled from "styled-components";
import Stats from "./Stats";
import useRecentBookings from "./useRecentBookings";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import useGetCabins from "../cabins/useGetCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;
`;

const DashboardLayout = () => {
	const { bookings, isLoading: isBookingsLoading } = useRecentBookings();
	const {
		// stays,
		isLoading: isStaysLoading,
		confirmedStays,
		numDays,
	} = useRecentStays();
	const { cabins, isLoading: isCabinsLoading } = useGetCabins();

	if (isBookingsLoading || isStaysLoading || isCabinsLoading)
		return <Spinner />;
	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabins.length}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
};

export default DashboardLayout;
