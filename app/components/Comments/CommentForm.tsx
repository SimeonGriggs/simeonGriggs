import {Form, useMatches} from '@remix-run/react'
import {Dialog} from '@headlessui/react'

import Button from '../Button'
import Label from '../Label'

const inputClasses = `border bg-white dark:bg-blue-800 border-blue-500 dark:border-white focus:border-blue-600 focus:outline-none focus:bg-blue-50 dark:focus:bg-blue-900 p-2 w-full`

export default function CommentForm({_key, closeDialog}: {_key: string; closeDialog: Function}) {
  const matches = useMatches()
  const {_id} = matches.find((match) => match?.handle?.id === `article`)?.data.initialData[0]

  return (
    <Dialog open onClose={() => closeDialog()} className="fixed inset-0 z-30 overflow-y-auto">
      <div className="z-50 flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 z-10 bg-blue-500/90 dark:bg-blue-900/90" />

        <div className="relative z-20 mx-auto max-w-sm rounded bg-white p-6 shadow dark:bg-blue-800 md:p-12">
          <button
            type="button"
            onClick={() => closeDialog()}
            className="float-right rounded-full p-2 text-blue-500 focus:bg-white focus:text-blue-500 dark:text-white dark:focus:bg-blue-500"
            title="Close"
          >
            {/* <XIcon className="h-auto w-8" /> */}
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
