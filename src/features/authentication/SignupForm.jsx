import { useForm } from "react-hook-form";

import useSignup from "./useSignup";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

const SignupForm = () => {
	const { signup, isLoading: isSigningUp } = useSignup();
	const { register, formState, handleSubmit, getValues, reset } = useForm();
	const { errors } = formState;

	const onSubmit = ({ fullName, email, password }) => {
		// console.log(data);
		signup(
			{
				fullName,
				email,
				password,
			},
			{
				onSettled: () => {
					reset();
				},
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors?.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					{...register("fullName", {
						required: "This field is required",
					})}
					disabled={isSigningUp}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors?.email?.message}>
				<Input
					type="email"
					id="email"
					disabled={isSigningUp}
					{...register("email", {
						required: "This field is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Please provide a valid email",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors?.password?.message}
			>
				<Input
					type="password"
					id="password"
					disabled={isSigningUp}
					{...register("password", {
						required: "This field is required",
						minLength: {
							value: 8,
							message: "Password must be 8 characters atleast",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Confirm password"
				error={errors?.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					disabled={isSigningUp}
					{...register("passwordConfirm", {
						required: "This field is required",
						validate: (value) =>
							value === getValues().password || "Passwords need to match",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button
					$variation="secondary"
					type="reset"
					disabled={isSigningUp}
					onClick={reset}
				>
					Cancel
				</Button>
				<Button disabled={isSigningUp}>Create new user</Button>
			</FormRow>
		</Form>
	);
};

export default SignupForm;
