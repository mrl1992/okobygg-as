import {type SchemaTypeDefinition} from 'sanity'

import {products} from './products'
import {employees} from './employees'
import {categories} from './categories'

export const schema: {types: SchemaTypeDefinition[]} = {
  types: [products, employees, categories],
}
