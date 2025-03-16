import { NextFunction, Request, Response } from "express";
import { BadRequestResponse, InternalServerErrorResponse, SuccessResponse } from "../../helpers/http";
import Category from '../../db/category.model';
import { CATEGORY } from "../../helpers/message";

export class CategoryController {

    public async createCategory(req: Request, res: Response): Promise<any> {
        try {
            const { body } = req;

            if (body.parent_id) {
                const find_parent_category = await Category.findOne({ _id: body.parent_id });
                if (!find_parent_category) {
                    return BadRequestResponse(res, CATEGORY.PARENT_NOT_FOUND);
                }
            }

            const existingCategory = await Category.findOne(body);
            if (existingCategory) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_EXIST);
            }

            const newCategory = new Category(body);
            await newCategory.save();

            return SuccessResponse(res, CATEGORY.CATEGORY_CREATED, newCategory);
        } catch (error: any) {
            console.log('error: ', error);
            return InternalServerErrorResponse(res, error.message);

        }
    }

    public async getCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await Category.aggregate([
                {
                    $graphLookup: {
                        from: "categories",
                        startWith: "$_id",
                        connectFromField: "_id",
                        connectToField: "parent_id",
                        as: "allChildren"
                    }
                },
                {
                    $match: { parent_id: null }
                },
                {
                    $addFields: {
                        children: {
                            $function: {
                                body: function (allChildren: any, parentId: any) {
                                    function buildTree(parentId: any) {
                                        return allChildren
                                            .filter((child: any) => String(child.parent_id) === String(parentId))
                                            .map((child: any) => ({
                                                ...child,
                                                children: buildTree(child._id)
                                            }));
                                    }
                                    return buildTree(parentId);
                                },
                                args: ["$allChildren", "$_id"],
                                lang: "js"
                            }
                        }
                    }
                },
                {
                    $project: {
                        allChildren: 0
                    }
                }
            ]);

            return SuccessResponse(res, CATEGORY.CATEGORY_FETCHED, categories);
        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);

        }
    }

    public async updateCategory(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { body } = req;

            const existingCategory = await Category.findOne({ _id: id });
            if (!existingCategory) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_NOT_FOUND);
            }

            existingCategory.name = body.name;

            if (body.status) {
                existingCategory.status = body.status;
                await Category.updateMany({ parent_id: id }, { status: body.status });
            }

            await existingCategory.save();

            return SuccessResponse(res, CATEGORY.CATEGORY_UPDATED, existingCategory);

        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);

        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            const existingCategory = await Category.findOne({ _id: id });
            if (!existingCategory) {
                return BadRequestResponse(res, CATEGORY.CATEGORY_NOT_FOUND);
            }

            await Category.updateMany({ parent_id: id }, { parent_id: existingCategory.parent_id });

            await Category.deleteOne({ _id: id });

            return SuccessResponse(res, CATEGORY.CATEGORY_DELETED);

        } catch (error: any) {
            return InternalServerErrorResponse(res, error.message);

        }
    }
}
