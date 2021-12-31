import {Form, useMatches} from 'remix'
import {Dialog} from '@headlessui/react'

import {XIcon} from '@heroicons/react/solid'
import Button from '../Button'
import Label from '../Label'

const inputClasses = `border bg-white dark:bg-blue-800 border-blue-500 dark:border-white focus:border-blue-600 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900 p-2 w-full`

export default function CommentForm({_key, closeDialog}: {_key: string; closeDialog: Function}) {
  const matches = useMatches()
  const {_id} = matches.find((match) => match.handle === `article`)?.data.initialData[0]

  return (
    <Dialog open onClose={() => closeDialog()} className="fixed z-30 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen z-50">
        <Dialog.Overlay className="fixed inset-0 bg-blue-500/90 dark:bg-blue-900/90 z-10" />

        <div className="relative bg-white dark:bg-blue-800 z-20 rounded shadow max-w-sm p-6 md:p-12 mx-auto">
          <button
            type="button"
            onClick={() => closeDialog()}
            className="float-right text-blue-500 dark:text-white focus:bg-white focus:text-blue-500 dark:focus:bg-blue-500 p-2 rounded-full"
            title="Close"
          >
            <XIcon className="w-8 h-auto" />
            <span className="sr-only">Close</span>
          </button>
          <p className="mb-4">
            If you found this post confusing, helpful, neither or both, let me know!
          </p>
          <Form method="post" className="grid grid-cols-1 gap-4">
            <input className="sr-only" type="hidden" name="_id" value={_id} />
            <input className="sr-only" type="hidden" name="_key" value={_key} />
            <input
              className="sr-only"
              type="text"
              name="validation"
              tabIndex={-1}
              defaultValue=""
            />
            <div className="grid grid-cols-1 gap-2">
              <Label>Comment</Label>
              <textarea
                required
                rows={2}
                name="content"
                title="Your Comment"
                minLength={10}
                maxLength={1000}
                className={inputClasses}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Name</Label>
              <input required type="text" name="name" title="Your Name" className={inputClasses} />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Email</Label>
              <input
                required
                type="email"
                title="Email Address"
                name="email"
                className={inputClasses}
              />
            </div>
            <Button type="submit">Post Comment</Button>
          </Form>
        </div>
      </div>
    </Dialog>
  )
}
