import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrEditCabin } from "../../services/apiCabins";

const useCreateCabin = () => {
	const queryClient = useQueryClient();

	//create operation
	const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
		mutationFn: (data) => createOrEditCabin(data),

		onSuccess: () => {
			toast.success("New Cabin created successfully");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
		},

		onError: (err) => toast.error(err.message),
	});

	return { isCreating, createNewCabin };
};

export default useCreateCabin;
