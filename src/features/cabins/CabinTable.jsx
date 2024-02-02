import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import useGetCabins from "./useGetCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";

const CabinTable = () => {
	const { isLoading, cabins } = useGetCabins();
	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!cabins.length) return <Empty resourceName="Cabins" />;

	//1. FILTER
	const filterValue = searchParams.get("discount") || "all"; //initially if we land at cabins page for first time , searchParam val will be null , and it would be ideal to shouw all cabins at first , short circuiting

	let filteredCabins;

	if (filterValue === "all") filteredCabins = cabins;
	if (filterValue === "no-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	if (filterValue === "with-discount")
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

	//2. SORT
	const sortBy = searchParams.get("sortBy") || "name-asc";

	const [columnName, direction] = sortBy.split("-");
	const modifier = direction === "asc" ? 1 : -1;
	const sortedCabins = filteredCabins.sort(
		(a, b) => (a[columnName] - b[columnName]) * modifier
	);

	return (
		<Menus>
			<Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Table.Header role="row">
					<div></div>
					<div>Cabin</div>
					<div>Capacity</div>
					<div>Price</div>
					<div>Discount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					// data = {cabins}
					// data={filteredCabins}
					data={sortedCabins}
					render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
				/>
			</Table>
		</Menus>
	);
};

export default CabinTable;
