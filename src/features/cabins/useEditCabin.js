import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createOrEditCabin } from "../../services/apiCabins";

const useEditCabin = () => {
	const queryClient = useQueryClient();
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, editCabinId }) =>
			createOrEditCabin(newCabinData, editCabinId),

		onSuccess: () => {
			toast.success("Cabin successfully edited");
			queryClient.invalidateQueries({
				queryKey: ["cabins"],
			});
			// reset(getValues());
		},

		onError: (err) => toast.error(err.message),
	});

	return { isEditing, editCabin };
};

export default useEditCabin;
