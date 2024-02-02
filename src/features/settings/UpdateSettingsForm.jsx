import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useGetSettings from "./useGetSettings";
import useUpdateSetting from "./useUpdateSetting";

const UpdateSettingsForm = () => {
	const {
		isSettingsDataLoading,
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestsPerBooking,
			breakfastPrice,
		} = {},
	} = useGetSettings();
	// console.log(settings);
	const { isUpdating, updateSetting } = useUpdateSetting();

	if (isSettingsDataLoading) return <Spinner />;

	const handleUpdate = (e, field) => {
		// const { value, id, defaultValue } = e.target;
		const { value, defaultValue } = e.target;

		// If the value is empty, restore it to the defaultValue (previous value)
		if (!value.trim()) {
			e.target.value = defaultValue;
			return;
		}

		// If the value has changed and is not empty, trigger the update operation
		if (value !== defaultValue) {
			updateSetting({ [field]: value });
		}
		// const { value } = e.target;
		// console.log(value);
		// if (!value) return;
		// updateSetting({ [field]: value });
	};

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					disabled={isUpdating}
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestsPerBooking}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					defaultValue={breakfastPrice}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
				/>
			</FormRow>
		</Form>
	);
};

export default UpdateSettingsForm;
