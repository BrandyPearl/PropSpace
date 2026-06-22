import Property from "../models/Property.js";

export const createProperty = async ({ title, description, price, location, propertyType, imageUrls, ownerId }) => {
  if (!title || !description || price === undefined || !location?.city || !location?.country || !propertyType) {
    const error = new Error("title, description, price, location (city, country), and propertyType are required");
    error.statusCode = 400;
    throw error;
  }
  const allowedTypes = ["Apartment", "House", "Studio"];
  if (!allowedTypes.includes(propertyType)) {
    const error = new Error(`propertyType must be one of: ${allowedTypes.join(", ")}`);
    error.statusCode = 400;
    throw error;
  }
  if (typeof price !== "number" || price < 0) {
    const error = new Error("price must be a positive number");
    error.statusCode = 400;
    throw error;
  }
  const property = await Property.create({
    title,
    description,
    price,
    location,
    propertyType,
    imageUrls: imageUrls || [],
    owner: ownerId,
  });
  return property;
};

export const getAllProperties = async ({ city, minPrice, maxPrice } = {}) => {
  const filter = {};
  if (city) {
    filter["location.city"] = { $regex: city, $options: "i" };
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }
  const properties = await Property.find(filter)
    .populate("owner", "username email")
    .sort({ createdAt: -1 });
  return properties;
};

export const getPropertyById = async (id) => {
  const property = await Property.findById(id).populate("owner", "username email");
  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }
  return property;
};

export const getMyProperties = async (ownerId) => {
  const properties = await Property.find({ owner: ownerId }).sort({ createdAt: -1 });
  return properties;
};

export const updateProperty = async (id, ownerId, updates) => {
  const property = await Property.findById(id);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  if (property.owner.toString() !== ownerId) {
    const error = new Error("You are not authorized to modify this listing");
    error.statusCode = 403;
    throw error;
  }

  const allowedFields = ["title", "description", "price", "location", "propertyType", "imageUrls"];
  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      property[field] = updates[field];
    }
  });

  await property.save();
  return property;
};

export const deleteProperty = async (id, ownerId) => {
  const property = await Property.findById(id);

  if (!property) {
    const error = new Error("Property not found");
    error.statusCode = 404;
    throw error;
  }

  if (property.owner.toString() !== ownerId) {
    const error = new Error("You are not authorized to delete this listing");
    error.statusCode = 403;
    throw error;
  }

  await Property.findByIdAndDelete(id);
  return { id };
};
