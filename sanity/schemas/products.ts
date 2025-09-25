import {defineField, defineType} from 'sanity'

export const products = defineType({
  name: 'product',
  title: 'Product',
  //   icon: UserIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // defineField({
    //   name: 'insulationType',
    //   title: 'Type isolasjon',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Rull', value: 'rull'},
    //       {title: 'Plate', value: 'plate'},
    //     ],
    //     layout: 'dropdown',
    //   },
    //   // 👇 only show if category is "isolasjon"
    //   hidden: ({parent, document}) => {
    //     console.log('parent:', parent)
    //     console.log('document?.category:', document?.category)

    //     if (!parent.category) return true

    //     // If category is populated, check the reference _ref
    //     // Replace 'isolasjonCatId' with your actual Sanity category document ID for isolasjon
    //     return parent.category._ref !== 'e6882976-3a44-4be0-a72d-6241c81c48d4'
    //   },
    // }),
    defineField({
      name: 'price',
      title: 'Pris',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      type: 'image',
      // Only show this field when category is "isolasjon".
      // If category is a reference, replace 'isolasjon' with the actual category _id.

      // 👇 Enables crop and hotspot tools
      options: {
        hotspot: true,
        accept: 'image/jpeg',
      },
      // 👇 Optionally append additional fields to the image object
      fields: [
        defineField({
          name: 'caption',
          type: 'string',
        }),
        defineField({
          name: 'attribution',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      //   group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Beskrivelse',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'categories'}],
      validation: (rule) => rule.required(),
    }),

    // defineField({
    //   name: 'meassurement',
    //   title: 'Mål',
    //   type: 'number',
    //   validation: (rule) => rule.required(),
    // }),
    // defineField({
    //   name: 'thicknesses',
    //   title: 'Tykkelser / Varianter',
    //   type: 'array',
    //   of: [{type: 'number'}],
    //   description: 'Legg til tilgjengelige tykkelser for produktet',
    // }),
    defineField({
      name: 'thickness',
      title: 'Tykkelse (mm)',
      type: 'number',
      description: 'Tykkelse i millimeter',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'width',
      title: 'Bredde (mm)',
      type: 'number',
      description: 'Bredde i millimeter',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'length',
      title: 'Lengde (mm)',
      type: 'number',
      description: 'Lengde i millimeter',
    }),
    defineField({
      name: 'unit',
      title: 'Måleenhet',
      type: 'string',
      initialValue: 'pcs', // default
      options: {
        list: [
          {title: 'Stk', value: 'pcs'},
          {title: 'Løpemeter', value: 'lm'},
          {title: 'Kvadratmeter', value: 'm2'},
          {title: 'Kg', value: 'kg'},
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meassurement',
      title: 'Mål',
      type: 'number',
      description: 'Oppgis i meter',
    }),
    defineField({
      name: 'weight',
      title: 'Vekt (kg)',
      type: 'number',
      description: 'Vekt i kilogram',
    }),
    defineField({
      name: 'placements',
      title: 'Bruksområder',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'placement'}]}],
      validation: (rule) => rule.required().min(1),
    }),
  ],
})
