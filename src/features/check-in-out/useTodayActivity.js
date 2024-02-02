import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

const useTodayActivity = () => {
	const { data: activeBookings, isLoading } = useQuery({
		queryFn: getStaysTodayActivity,
		queryKey: ["today-activity"], //wont be affected by the filters on dashboard
	});
	return { activeBookings, isLoading };
};

export default useTodayActivity;
