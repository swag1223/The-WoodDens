import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabins as deleteCabinApi } from "../../services/apiCabins";

const useDeleteCabin = () => {
	const queryClient = useQueryClient();
	const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: (id) => deleteCabinApi(id),
		// same as mutationFn: deleteCabinApi,
		onSuccess: () => {
			toast.success("Cabin deleted successfully");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},

		onError: (err) => toast.error(err.message),
	});

	return { isDeleting, deleteCabin };
};

export default useDeleteCabin;
