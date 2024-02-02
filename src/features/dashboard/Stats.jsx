import {
	HiOutlineBanknotes,
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }) => {
	// console.log(confirmedStays, "stats");
	//1. no. of bookings
	const numOfBookings = bookings.length;
	// 2. total sales
	const sales = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

	//3. checkins
	const checkins = confirmedStays.length;

	//4. occupancy rate
	// num checked in nights / all available nights (num of days * num of cabins)
	const occupation =
		confirmedStays.reduce((acc, curr) => acc + curr.numOfNights, 0) /
		(numDays * cabinCount);

	return (
		<>
			<Stat
				title="Bookings"
				color="blue"
				icon={<HiOutlineBriefcase />}
				value={numOfBookings}
			/>
			<Stat
				title="Sales"
				color="green"
				icon={<HiOutlineBanknotes />}
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				color="indigo"
				icon={<HiOutlineCalendarDays />}
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				color="yellow"
				icon={<HiOutlineChartBar />}
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
};

export default Stats;
