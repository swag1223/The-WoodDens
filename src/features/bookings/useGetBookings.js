import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { NUM_OF_RESULTS_PER_PAGE } from "../../utils/constants";

const useGetBookings = () => {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	//FILTER
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue === "all"
			? null
			: { field: "status", value: filterValue };
	// :{field:"totalPrice" , value: 5000, method: "gte"}

	//SORT
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	const [columnName, direction] = sortByRaw.split("-");

	const sortBy = { columnName, direction };

	//PAGINATION
	const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

	const {
		isLoading,
		data: { data: bookings, count: numOfResults } = {},
		error,
	} = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	//PRE-FETCHING
	const numOfPages = Math.ceil(numOfResults / NUM_OF_RESULTS_PER_PAGE);
	if (page < numOfPages) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page + 1],
			queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		});
	}

	if (page > 1) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, page - 1],
			queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		});
	}

	return { isLoading, error, bookings, numOfResults };
};

export default useGetBookings;
