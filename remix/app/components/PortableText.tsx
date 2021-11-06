import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import getYouTubeID from "get-youtube-id";

import { config } from "~/lib/sanityConfig";
import sanityImageUrl from "~/lib/sanityImageUrl";
import Button from "./Button";
import Prism from "./Prism";

const { projectId, dataset } = config;

const BlockRenderer = (props) => {
  const { style = "normal" } = props.node;

  if (/^h\d/.test(style)) {
    return React.createElement(style, { id: props.node._key }, props.children);
  }

  if (["code", "pre"].includes(style)) {
    const text = props?.node?.children.map(({ text }) => text).join("");
    return text ? <Prism code={text} /> : null;
  }

  return BlockContent.defaultSerializers.types.block(props);
};

const serializers = {
  container: ({ children }) => children,
  types: {
    block: BlockRenderer,
    video: ({ node }) => {
      const id = getYouTubeID(node.url);

      // <YouTube v={id} alt={node?.title ?? ``} />

      return (
        <a href={node.url} target="_blank" rel="noopener noreferrer">
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            loading="lazy"
            alt={node?.title ?? ``}
            className="w-full h-full object-cover"
          />
        </a>
      );
    },
    break: () => <hr />,
    image: ({ node }) => (
      <p className="-mx-4 border-t border-b md:border border-gray-100">
        <img
          loading="lazy"
          src={sanityImageUrl(node.asset).width(800).toString()}
          alt={node?.asset?.altText}
          className="w-full h-auto"
        />
      </p>
    ),
    code: ({ node }) =>
      node?.code ? <Prism code={node.code} language={node?.language} /> : null,
    button: ({ node }) => (
      <Button href={node.link.link}>{node.link.text}</Button>
    ),
  },
};

export default function PortableText({ blocks }) {
  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers}
      projectId={projectId}
      dataset={dataset}
    />
  );
}
