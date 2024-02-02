import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

const useGetSettings = () => {
	const {
		isLoading: isSettingsDataLoading,
		data: settings,
		// error,
	} = useQuery({
		queryKey: ["settings"],
		queryFn: getSettings,
	});

	return { isSettingsDataLoading, settings };
};

export default useGetSettings;
