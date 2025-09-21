import {defineField, defineType} from 'sanity'

export const categories = defineType({
  name: 'categories',
  title: 'Categories',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      type: 'image',
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
      preview: {
        select: {
          title: 'title',
        },
      },
    }),
  ],
})
