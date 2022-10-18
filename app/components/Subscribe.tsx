import React from 'react'

const Subscribe = () => (
  // Things

  <aside className="mt-12 bg-blue-500 p-6 text-white">
    <h3 className="mb-3 border-b border-white pb-3 text-2xl font-black leading-none">
      There's more where this came from
    </h3>
    <p className="mb-6 text-lg">Subscribe for updates. Not spam.</p>

    {/* <script defer src="https://f.convertkit.com/ckjs/ck.5.js" /> */}
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
      <div data-element="fields" data-stacked="true" className="flex">
        {/* <div className='formkit-field'>
              <input className='formkit-input' aria-label='Your first name' name='fields[first_name]' placeholder='Your first name' type='text' />
            </div> */}
        <div className="formkit-field flex-1">
          <input
            className="h-full w-full border border-blue-500 p-3 text-lg text-blue-900 transition-colors duration-200 ease-out focus:border-white focus:bg-blue-900 focus:text-white focus:outline-none"
            name="email_address"
            placeholder="Your email address"
            required
            type="email"
          />
        </div>
        <button data-element="submit" type="submit" className="button">
          Subscribe
        </button>
      </div>
    </form>
  </aside>
)

export default Subscribe
