import imageUrlBuilder from "@sanity/image-url";
import { projectId, dataset } from "./sanityConfig";

const client = { projectId, dataset };
const builder = imageUrlBuilder(client);

export function sanityImageUrl(source) {
  return builder.image(source);
}
