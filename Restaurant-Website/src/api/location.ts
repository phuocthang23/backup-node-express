/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const getLocation = () => {
  return axios
    .get("https://vapi.vnappmob.com/api/province/district/48")
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getWand = (districtId) => {
  return axios
    .get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`)
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

export const getLocationData = async (locationName: any) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        locationName
      )}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu: " + error);
  }
};
