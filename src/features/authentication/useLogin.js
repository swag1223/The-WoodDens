import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login as loginApi } from "../../services/apiAuth";

const useLogin = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: login, isLoading: isLoggingIn } = useMutation({
		mutationFn: ({ email, password }) =>
			loginApi({
				email,
				password,
			}),
		onSuccess: (user) => {
			// console.log(user);
			queryClient.setQueryData(["user"], user.user); //manually setting react query cache
			navigate("/dashboard", { replace: true });
			toast.success("Welcome!");
		},
		onError: (err) => {
			// console.log("ERROR", err);
			toast.error("Provided email or password are incorrect");
		},
	});

	return { login, isLoggingIn };
};

export default useLogin;
