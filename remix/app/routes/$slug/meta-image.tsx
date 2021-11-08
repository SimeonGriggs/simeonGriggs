import type {MetaFunction, LoaderFunction} from 'remix'
import {useLoaderData} from 'remix'

export const loader: LoaderFunction = async ({params}) => {
  return {params}
}

export default function MetaImage() {
  const {params} = useLoaderData()

  return <div>{JSON.stringify(params)}</div>
}
