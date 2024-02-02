import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

const useUpdateSetting = () => {
	const queryClient = useQueryClient();
	const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
		mutationFn: updateSettingApi,

		onSuccess: () => {
			toast.success("Setting data successfully updated");
			queryClient.invalidateQueries({
				queryKey: ["settings"],
			});
			// reset(getValues());
		},

		onError: (err) => toast.error(err.message),
	});

	return { isUpdating, updateSetting };
};

export default useUpdateSetting;
