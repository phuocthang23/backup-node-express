import * as AddressRepository from "../repositories/addressRepository";

//* create
export const createAddressServices = async (body) => {
  try {
    const response = await AddressRepository.createAddress(body);
    return {
      success: response[1] === true ? true : false,
      message:
        response[1] === true
          ? "Create address successfully"
          : "address is available",
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//* getAll
export const getAllAddressServices = async () => {
  try {
    const response = await AddressRepository.getAllAddresses();
    const address = response.map((address) => address.dataValues);
    return {
      success: true,
      data: address,
    };
  } catch (error) {
    throw error;
  }
};

//* getone
export const getOneAddressServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }
    const response = await AddressRepository.getOneAddress({ id });
    if (response !== null) {
      return {
        success: true,
        data: response.dataValues,
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

export const updateAddressServices = async (id, body) => {
  try {
    const updated = await AddressRepository.updateAddress(id, body);
    console.log(updated);
    return {
      success: true,
      message: `Address updated successfully`,
    };
  } catch (error) {
    throw error;
  }
};

//* delete
export const deleteOneAddressServices = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Bad request");
    }

    const response = await AddressRepository.deleteOneAddress({ id });

    if (response === 1) {
      return { success: true, message: "User deleted successfully" };
    } else if (response === 0) {
      return { success: false, message: "User not found" };
    } else {
      return { success: false, message: "Unexpected result" };
    }
  } catch (error) {
    console.log(">>>>", error);
    throw error;
  }
};
