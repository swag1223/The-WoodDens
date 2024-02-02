import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

const useDeleteBooking = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeletingBooking, mutate: deleteBooking } = useMutation({
		mutationFn: (id) => deleteBookingApi(id),
		onSuccess: () => {
			toast.success("Booking deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["bookings"],
			});
		},

		onError: (err) => toast.error(err.message),
	});

	return { isDeletingBooking, deleteBooking };
};

export default useDeleteBooking;
