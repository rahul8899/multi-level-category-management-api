import Joi from "joi";

export const categorySchema = Joi.object({
    name: Joi.string().required(),
    parent_id: Joi.string().allow(null).optional(),
});

export const categoryUpdateSchema = Joi.object({
    name: Joi.string().optional(),
    status: Joi.string().valid('active', 'inactive').optional(),
});