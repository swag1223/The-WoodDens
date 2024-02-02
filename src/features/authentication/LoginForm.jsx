import { useState } from "react";

import useLogin from "./useLogin";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("demo@example.com");
	const { login, isLoggingIn } = useLogin("demo@0987");

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) return;
		login(
			{ email, password },
			{
				onSettled: () => {
					setEmail("");
					setPassword("");
				},
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<FormRowVertical label="Email address">
				<Input
					type="email"
					id="email"
					// This makes this form better for password managers
					autoComplete="username"
					value={email}
					disabled={isLoggingIn}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical label="Password">
				<Input
					type="password"
					id="password"
					autoComplete="current-password"
					value={password}
					disabled={isLoggingIn}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</FormRowVertical>
			<FormRowVertical>
				<Button size="large" disabled={isLoggingIn}>
					{!isLoggingIn ? "Login in" : <SpinnerMini />}
				</Button>
			</FormRowVertical>
		</Form>
	);
};

export default LoginForm;
