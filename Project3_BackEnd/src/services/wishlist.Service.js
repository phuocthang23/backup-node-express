import * as WishlistRepository from "../repositories/wishListRepository";

//* create
export const createWishlistServices = async (body) => {
  try {
    const response = await WishlistRepository.createWishlist(body);
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Create Wishlist successfully"
          : "Wishlist is available",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//* getAll
export const getAllWishlistServices = async () => {
  try {
    const response = await WishlistRepository.getAllWishlist();
    const Wishlist = response.map((Wishlist) => Wishlist.dataValues);
    return {
      success: true,
      data: Wishlist,
    };
  } catch (error) {
    throw error;
  }
};

//* getone all
export const getOneWishlistServices = async ({ id }) => {
  console.log(id);
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await WishlistRepository.getallWishlistById({ id });
    console.log(response);
    const Wishlist = response.map((Wishlist) => Wishlist.dataValues);
    if (Wishlist.length > 0) {
      return {
        success: true,
        data: Wishlist,
      };
    } else {
      return { success: false, message: "Not found" };
    }
  } catch (error) {
    console.log(">>>>", error);
    throw error;
  }
};

//* update

export const updateWishlistServices = async (id, body) => {
  try {
    const updated = await WishlistRepository.updateWishlist(id, body);
    console.log(updated);
    return {
      success: true,
      message: `Wishlist updated successfully`,
    };
  } catch (error) {
    throw error;
  }
};

//* delete
export const deleteOneWishlistServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }

    const response = await WishlistRepository.deleteOneWishlist({ id });

    if (response === 1) {
      return { success: true, message: "wishlist deleted successfully" };
    } else if (response === 0) {
      return { success: false, message: "wishlist not found" };
    } else {
      return { success: false, message: "Unexpected result" };
    }
  } catch (error) {
    console.log(">>>>", error);
    throw error;
  }
};
