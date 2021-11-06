import imageUrlBuilder from "@sanity/image-url";
import { config } from "./sanityConfig";

const { projectId, dataset } = config;
const builder = imageUrlBuilder({ projectId, dataset });

export default function sanityImageUrl(source: any) {
  return builder.image(source);
}
