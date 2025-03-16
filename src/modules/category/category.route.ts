import { Router } from 'express'
import { bodyValidator } from '../../middleware/validate.middleware'
import { CategoryController } from './category.controller'
import { categorySchema, categoryUpdateSchema } from './category.schema'
import { Auth } from '../../middleware/auth.middleware'

export class CategoryRoute {
    router = Router()
    private catCont: CategoryController = new CategoryController()

    constructor() {
        this.router.post('/', [Auth, bodyValidator(categorySchema)], this.catCont.createCategory)

        this.router.get('/', [Auth], this.catCont.getCategories)

        this.router.put('/:id', [Auth, bodyValidator(categoryUpdateSchema)], this.catCont.updateCategory)

        this.router.delete('/:id', [Auth], this.catCont.deleteCategory)
    }
}
