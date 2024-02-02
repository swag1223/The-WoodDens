import { useSearchParams } from "react-router-dom";
import Select from "./Select";

const SortBy = ({ options }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const currSortBy = searchParams.get("sortBy") || "";

	const handleChange = (e) => {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	};

	return (
		<Select
			options={options}
			type="white"
			onChange={handleChange}
			currSelectedVal={currSortBy}
		/>
	);
};

export default SortBy;
