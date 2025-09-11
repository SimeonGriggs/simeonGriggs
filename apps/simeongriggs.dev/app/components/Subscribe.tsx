import {Input} from '@headlessui/react'
import {BlockH2, BlockNormal, Button} from '@repo/frontend'
import {clsx} from 'clsx'

const Subscribe = () => (
  <aside className="rounded-tr-4xl relative min-w-0 overflow-hidden rounded-b-lg rounded-tl-lg bg-white p-8 shadow-md shadow-black/5 ring-1 ring-black/5">
    <BlockH2>There's more where this came from</BlockH2>
    <BlockNormal>Subscribe for updates. Not spam.</BlockNormal>

    <form
      action="https://app.convertkit.com/forms/1465609/subscriptions"
      className=""
      method="post"
      data-sv-form="1465609"
      data-uid="1759c66481"
      data-format="inline"
      data-version="5"
      data-options='{"settings":{"after_subscribe":{"action":"message","success_message":"Success! Now check your email to confirm your subscription.","redirect_url":""},"analytics":{"google":null,"facebook":null,"segment":null,"pinterest":null},"modal":{"trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"powered_by":{"show":true,"url":"https://convertkit.com?utm_source=dynamic&amp;utm_medium=referral&amp;utm_campaign=poweredby&amp;utm_content=form"},"recaptcha":{"enabled":false},"return_visitor":{"action":"hide","custom_content":""},"slide_in":{"display_in":"bottom_right","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15},"sticky_bar":{"display_in":"top","trigger":"timer","scroll_percentage":null,"timer":5,"devices":"all","show_once_every":15}},"version":"5"}'
    >
      <div
        data-element="fields"
        data-stacked="true"
        className="flex flex-col items-center gap-3 md:flex-row"
      >
        <div className="formkit-field flex-1">
          <Input
            autoFocus
            name="email_address"
            placeholder="Your email address"
            required
            type="email"
            className={clsx(
              'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
              'p-2 text-base/6 sm:text-sm/6',
              'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
            )}
          />
        </div>
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  </aside>
)

export default Subscribe
