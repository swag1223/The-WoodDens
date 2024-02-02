import supabase, { supabaseUrl } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: {
				fullName,
				avatar: "",
			},
		},
	});

	if (error) {
		throw new Error(error.message);
	}

	// console.log(data);
	return data;
};

export const login = async ({ email, password }) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw new Error(error.message);
	}

	// console.log(data);
	return data;
};

export const getCurrentUser = async () => {
	const { data: session } = await supabase.auth.getSession(); //will get data from local storage

	if (!session.session) return null;

	const { data, error } = await supabase.auth.getUser();

	// console.log(data);

	if (error) {
		throw new Error(error.message);
	}

	return data?.user;
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		throw new Error(error.message);
	}
};

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
	//1. Update password OR fullName
	let updateData;
	if (password) updateData = { password };
	if (fullName)
		updateData = {
			data: { fullName },
		};
	const { data, error } = await supabase.auth.updateUser(updateData);
	if (error) {
		throw new Error(error.message);
	}

	if (!avatar) return data;

	//2. Upload avatar image
	const avatarFileName = `avatar-${data.user.id}-${Math.random()}`;

	const { error: storageError } = await supabase.storage
		.from("avatars")
		.upload(avatarFileName, avatar);

	if (storageError) {
		throw new Error(storageError.message);
	}

	//3. Update avatar in the user
	const { data: updatedUser, error: updateUserError } =
		await supabase.auth.updateUser({
			data: {
				avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${avatarFileName}`,
			},
		});
	if (updateUserError) {
		throw new Error(storageError.message);
	}
	return updatedUser;
};
