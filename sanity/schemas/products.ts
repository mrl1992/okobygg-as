import {defineType, defineField} from 'sanity'

export const products = defineType({
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: [{type: 'categories'}],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'usage',
      title: 'Bruksområde',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'placement'}]}],
      description: 'F.eks. vegg, tak, gulv, vindu',
    }),

    defineField({
      name: 'installationType',
      title: 'Monteringstype',
      type: 'string',
      options: {
        list: [
          {title: 'Kun materiale', value: 'material'},
          {title: 'Materiale + montering', value: 'material_and_install'},
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'price',
      title: 'Pris',
      type: 'number',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'poster',
      title: 'Produktbilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'caption', type: 'string'},
        {name: 'attribution', type: 'string'},
      ],
    }),

    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'text',
    }),

    defineField({
      name: 'coverage',
      title: 'Dekning (m² per enhet, løpemeter, etc.)',
      type: 'number',
      description: 'Hvor mange kvadratmeter dekker én enhet av produktet',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'specs',
      title: 'Spesifikasjoner',
      type: 'object',
      fields: [
        {name: 'thickness', title: 'Tykkelse (mm)', type: 'number'},
        {name: 'width', title: 'Bredde (mm)', type: 'number'},
        {name: 'length', title: 'Lengde (mm)', type: 'number'},
        {name: 'weight', title: 'Vekt (kg)', type: 'number'},
        {
          name: 'unit',
          title: 'Enhet',
          type: 'string',
          options: {
            list: [
              {title: 'Stk', value: 'pcs'},
              {title: 'Løpemeter', value: 'lm'},
              {title: 'Kvadratmeter', value: 'm2'},
              {title: 'Kg', value: 'kg'},
            ],
          },
        },
      ],
    }),
  ],
})
