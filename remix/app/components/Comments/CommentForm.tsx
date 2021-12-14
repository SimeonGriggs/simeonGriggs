import {Form, useMatches} from 'remix'
import {Dialog} from '@headlessui/react'

import Button from '../Button'
import Label from '../Label'

export default function CommentForm({_key, closeDialog}: {_key: string; closeDialog: Function}) {
  const matches = useMatches()
  const {_id} = matches.find((match) => match.handle === `article`)?.data.initialData[0]

  return (
    <Dialog open onClose={() => closeDialog()} className="fixed z-30 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen z-50">
        <Dialog.Overlay className="fixed inset-0 bg-blue-500/10 z-10" />

        <div className="relative bg-white z-20 rounded shadow max-w-sm p-6 md:p-12 mx-auto">
          <p className="mb-4">
            If you found this post confusing, helpful, neither or both, let me know!
          </p>
          <Form method="post" className="grid grid-cols-1 gap-4">
            <input className="sr-only" type="hidden" name="_id" value={_id} />
            <input className="sr-only" type="hidden" name="_key" value={_key} />
            <input className="sr-only" type="text" name="validation" value="" />
            <div className="grid grid-cols-1 gap-2">
              <Label>Comment</Label>
              <textarea
                required
                rows={2}
                name="content"
                title="Your Comment"
                minLength={10}
                maxLength={1000}
                className="border border-blue-500 p-2 w-full rounded"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Name</Label>
              <input
                required
                type="text"
                name="name"
                title="Your Name"
                className="border border-blue-500 p-2 w-full rounded"
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label>Email</Label>
              <input
                required
                type="email"
                title="Email Address"
                name="email"
                className="border border-blue-500 p-2 w-full rounded"
              />
            </div>
            <Button type="submit">Post Comment</Button>
          </Form>
        </div>
      </div>
    </Dialog>
  )
}
