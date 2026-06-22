import { createProperty, getAllProperties, getPropertyById, getMyProperties, updateProperty, deleteProperty } from "../services/property.service.js";

export const create = async (req, res) => {
  try {
    const { title, description, price, location, propertyType, imageUrls } = req.body;
    const property = await createProperty({
      title, description, price, location, propertyType, imageUrls,
      ownerId: req.user.id,
    });
    res.status(201).json({ message: "Property created successfully", property });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const getAll = async (req, res) => {
  try {
    const { city, minPrice, maxPrice } = req.query;
    const properties = await getAllProperties({ city, minPrice, maxPrice });
    res.status(200).json({ properties });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const getOne = async (req, res) => {
  try {
    const property = await getPropertyById(req.params.id);
    res.status(200).json({ property });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const getMine = async (req, res) => {
  try {
    const properties = await getMyProperties(req.user.id);
    res.status(200).json({ properties });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const update = async (req, res) => {
  try {
    const property = await updateProperty(req.params.id, req.user.id, req.body);
    res.status(200).json({ message: "Property updated successfully", property });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};

export const remove = async (req, res) => {
  try {
    await deleteProperty(req.params.id, req.user.id);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message: error.message || "Server error" });
  }
};
