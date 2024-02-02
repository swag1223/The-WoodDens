import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
};

export const deleteCabins = async (id) => {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be deleted");
	}

	return data;
};

export const createOrEditCabin = async (newCabin, editCabinId) => {
	const hasImagePathAlready = newCabin.image?.startsWith?.(supabaseUrl);

	//note: if the cabin name will contain any '/', supabase will create folders on the basis of that
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);

	const imagePath = hasImagePathAlready
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. Create/edit cabin
	let query = supabase.from("cabins");

	//A. CREATE
	if (!editCabinId) {
		query = query.insert([{ ...newCabin, image: imagePath }]);
	}

	//B. EDIT
	if (editCabinId) {
		query = query
			.update({ ...newCabin, image: imagePath })
			.eq("id", editCabinId);
	}

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);
		throw new Error("Cabin could not be created"); //TODO: Update error msg for edit and create
	}

	//2. upload image only if the cabin creation is successfull
	if (hasImagePathAlready) return data; //if image is already uploaded for a cabin , no upload should be allowed

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	//3. Delete cabin if there was error uplaoding corresponsing image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);
		console.error(storageError);
		throw new Error(
			"Cabin Image could not be uploaded, and NO new Cabin was created"
		);
	}

	return data;
};
