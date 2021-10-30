import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import Highlight, { defaultProps } from "prism-react-renderer";
import github from "prism-react-renderer/themes/github";
import getYouTubeID from "get-youtube-id";

import YouTube from "../components/YouTube.astro";
import { projectId, dataset } from "../lib/sanityConfig.mjs";
import { sanityImageUrl } from "../lib/sanityImageUrl";
import Button from "./Button";

const PrismWrapper = ({ code = ``, language = `plaintext` }) => {
  return (
     <Highlight.default {...defaultProps} code={code} language={language} theme={github}>
       {({ className, style, tokens, getLineProps, getTokenProps }) => (
         <pre className={className} style={style}>
           {tokens.map((line, i) => (
             <div {...getLineProps({ line, key: i })}>
               {line.map((token, key) => (
                 <span {...getTokenProps({ token, key })} />
               ))}
             </div>
           ))}
         </pre>
       )}
     </Highlight.default>
  )
}

const BlockRenderer = (props) => {
  const { style = "normal" } = props.node;

  if (/^h\d/.test(style)) {
    return React.createElement(style, { id: props.node._key }, props.children);
  }

  // if (['code', 'pre'].includes(style)) {
  //   return JSON.stringify(props.node?.children)
  //   // return props?.node?.children ? <Prism code={props.node?.children} /> : null
  // }

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
        <lite-youtube v={id} alt={node?.title ?? ``}>
          <a href={node.url} target="_blank" rel="noopener noreferrer">
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              loading="lazy"
              alt={node?.title ?? ``}
              className="w-full h-full object-cover"
            />
          </a>
        </lite-youtube>
      );
    },
    image: ({ node }) => (
      <p className="-mx-4 md:border md:border-gray-100">
        <img
          loading="lazy"
          src={sanityImageUrl(node.asset).width(800)}
          alt={node?.asset?.altText}
          class="w-full h-auto"
        />
      </p>
    ),
    code: ({ node }) => node?.code ? <PrismWrapper code={node.code} language={node?.language} /> : null,
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
