import {defineType, defineField} from 'sanity'

export const placement = defineType({
  name: 'placement',
  title: 'Application',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Navn',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Verdi',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})
