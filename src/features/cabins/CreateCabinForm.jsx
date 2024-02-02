import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useEditCabin from "./useEditCabin";

const CreateCabinForm = ({ cabinToEdit = {}, onCloseModal }) => {
	//create operation
	const { isCreating, createNewCabin } = useCreateCabin();
	//edit operation
	const { isEditing, editCabin } = useEditCabin();

	const { id: editCabinId, ...editValues } = cabinToEdit;
	// console.log(editValues);
	const isEditSession = Boolean(editCabinId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;
	// console.log(errors);

	const isLoadingInProgress = isCreating || isEditing;

	const onSubmit = (data) => {
		const image = typeof data.image === "string" ? data.image : data.image[0]; //fails if no image is chosen once file explorer opens

		if (isEditSession)
			editCabin(
				{ newCabinData: { ...data, image }, editCabinId },
				{
					onSuccess: (editData) => {
						// console.log(editData);
						reset(getValues());
						onCloseModal?.();
					},
				}
			);
		else
			createNewCabin(
				{ ...data, image: image },
				{
					onSuccess: (newCabinData) => {
						// console.log(newCabinData);
						reset();
						onCloseModal?.();
					},
				}
			);
		// console.log(data);
	};

	const onError = (errors) => {
		// console.log(errors);
		//might want to log something to sentry or error monitoring app like that
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isLoadingInProgress}
					{...register("name", {
						required: "This field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isLoadingInProgress}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be atleast 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					disabled={isLoadingInProgress}
					{...register("regularPrice", {
						required: "This field is required",
						min: {
							value: 100,
							message: "Price should be atleast $100",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isLoadingInProgress}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							"Discount should be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
			>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					disabled={isLoadingInProgress}
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin Photo">
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					$variation="secondary"
					type="reset"
					onClick={() => onCloseModal?.()}
				>
					{/*if this form is ever used in some other place where it isn't contained in a modal, then it may not receive this onCloseModal prop. so using optional chaining in case it is undefined*/}
					Cancel
				</Button>
				<Button disabled={isLoadingInProgress}>
					{isEditSession ? "Save" : "Create New Cabin"}
				</Button>
			</FormRow>
		</Form>
	);
};

export default CreateCabinForm;
