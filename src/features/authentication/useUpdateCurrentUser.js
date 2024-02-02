import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCurrentUser } from "../../services/apiAuth";

const useUpdateCurrentUser = () => {
	const queryClient = useQueryClient();
	const { mutate: updateUser, isLoading: isUpdating } = useMutation({
		mutationFn: updateCurrentUser,
		onSuccess: ({ user }) => {
			toast.success("User Account updated successfully");
			queryClient.setQueryData(["user"], user);
		},
		onError: (err) => toast.error(err.message),
	});

	return { updateUser, isUpdating };
};

export default useUpdateCurrentUser;
