import {JoystickIcon} from '@sanity/icons'

export default {
  name: 'talk',
  title: 'Talk',
  icon: JoystickIcon,
  type: 'document',
  orderings: [
    {title: 'Event Date', name: 'eventDateDesc', by: [{field: 'eventDate', direction: 'desc'}]},
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
    },
    {
      name: 'event',
      type: 'string',
    },
    {
      name: 'eventDate',
      type: 'date',
    },
    {
      name: 'location',
      description: 'Leave blank for online event',
      type: 'string',
    },
    {
      name: 'link',
      type: 'url',
    },
    {
      name: 'video',
      type: 'video',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'portableText',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
    {type: 'seo', name: 'seo'},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'event',
      media: 'image',
    },
  },
}
