var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __objSpread = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// <stdin>
__markAsModule(exports);
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = import_server.default.renderToString(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  handle: () => handle,
  links: () => links,
  loader: () => loader
});
var import_remix4 = __toModule(require("remix"));
var import_react_router_dom = __toModule(require("react-router-dom"));
var import_usehooks_ts3 = __toModule(require("usehooks-ts"));

// app/styles/global.css
var global_default = "/build/_assets/global-BSQJH6GN.css";

// app/components/Header.tsx
var import_solid = __toModule(require("@heroicons/react/solid"));
var import_remix2 = __toModule(require("remix"));
var import_usehooks_ts = __toModule(require("usehooks-ts"));

// app/components/Twitter.tsx
function Twitter({className}) {
  return /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    className
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "currentColor",
    d: "M3 17.68a10.215 10.215 0 005.53 1.623c6.697 0 10.478-5.658 10.25-10.73a7.346 7.346 0 001.8-1.866 7.192 7.192 0 01-2.072.565 3.604 3.604 0 001.588-1.996 7.196 7.196 0 01-2.308.877 3.608 3.608 0 00-6.153 3.289 10.246 10.246 0 01-7.412-3.766 3.612 3.612 0 001.12 4.816 3.558 3.558 0 01-1.635-.454A3.612 3.612 0 006.6 13.622a3.623 3.623 0 01-1.63.062 3.612 3.612 0 003.368 2.504A7.238 7.238 0 013 17.68z"
  }));
}
var Twitter_default = Twitter;

// app/components/GitHub.tsx
function GitHub({className}) {
  return /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    className
  }, /* @__PURE__ */ React.createElement("path", {
    fill: "currentColor",
    d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
  }));
}
var GitHub_default = GitHub;

// app/components/Header.tsx
var Header = ({siteMeta}) => {
  const {title} = siteMeta != null ? siteMeta : {};
  const menuClasses = "fixed text-sm z-50 inset-0 bottom-auto md:bottom-0 md:right-auto md:w-1/12 lg:w-1/16 flex items-center justify-center";
  const buttonClasses = "flex items-center justify-center p-1 w-7 h-7 md:w-10 md:h-10 text-blue-500 rounded-full bg-white hover:bg-blue-900 hover:text-white";
  const {isDarkMode, toggle} = (0, import_usehooks_ts.useDarkMode)();
  return /* @__PURE__ */ React.createElement("header", {
    className: menuClasses
  }, /* @__PURE__ */ React.createElement("div", {
    className: "md:w-full bg-blue-500 py-2 px-3 md:py-8 text-white font-mono flex md:flex-col justify-center items-center"
  }, /* @__PURE__ */ React.createElement(import_remix2.Link, {
    to: "/",
    className: "text-vertical flex items-center justify-center hover:bg-blue-900"
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: "w-12 md:h-16 lg:h-24 md:w-auto border-t md:border-t-none md:border-l border-white mx-3 md:mx-0 md:my-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex space-x-3 md:flex-col md:space-x-0 md:space-y-3"
  }, /* @__PURE__ */ React.createElement("a", {
    className: buttonClasses,
    href: "https://twitter.com/simeonGriggs/",
    target: "blank",
    rel: "noopener noreferrer"
  }, /* @__PURE__ */ React.createElement(Twitter_default, {
    className: "w-full"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "sr-only"
  }, "Twitter")), /* @__PURE__ */ React.createElement("a", {
    className: buttonClasses,
    href: "https://github.com/SimeonGriggs/",
    target: "blank",
    rel: "noopener noreferrer"
  }, /* @__PURE__ */ React.createElement(GitHub_default, {
    className: "w-full"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "sr-only"
  }, "GitHub")), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => toggle(),
    className: buttonClasses
  }, isDarkMode ? /* @__PURE__ */ React.createElement(import_solid.SunIcon, {
    className: "w-full h-auto md:w-5"
  }) : /* @__PURE__ */ React.createElement(import_solid.MoonIcon, {
    className: "w-full h-auto md:w-5"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "sr-only"
  }, isDarkMode ? `Light` : `Dark`, " Mode")))));
};
var Header_default = Header;

// app/lib/sanityServer.tsx
var import_next_sanity = __toModule(require("next-sanity"));

// app/lib/sanityConfig.ts
var config = {
  dataset: "production",
  projectId: "az8av6xl",
  apiVersion: "2021-03-25",
  useCdn: true
};

// app/lib/sanityServer.tsx
var sanityClient = (0, import_next_sanity.createClient)(config);
var previewClient = (0, import_next_sanity.createClient)(__objSpread(__objSpread({}, config), {
  useCdn: false
}));
var getClient = (usePreview = false) => usePreview ? previewClient : sanityClient;

// app/components/Banner.tsx
var import_react = __toModule(require("react"));
var import_remix3 = __toModule(require("remix"));
var import_react_router = __toModule(require("react-router"));
var import_framer_motion = __toModule(require("framer-motion"));
var import_usehooks_ts2 = __toModule(require("usehooks-ts"));

// app/lib/helpers.ts
function twoDecimals(num) {
  return Math.round(num * 100) / 100;
}
function heightColumnOffset(columns = 16) {
  if (typeof window === "undefined") {
    return 0;
  }
  const {innerHeight, innerWidth} = window;
  const widthColumn = innerWidth / columns;
  const heightMinusColumn = innerHeight - widthColumn;
  const heightPerc = heightMinusColumn / innerHeight * 100;
  return twoDecimals(heightPerc);
}
function clipPathInset(columns, left, right, y) {
  const heightPerc = y ? heightColumnOffset(columns) : 100;
  const corners = [
    `${100 / columns * left}% ${twoDecimals(100 - heightPerc)}%`,
    `${100 / columns * right}% ${twoDecimals(100 - heightPerc)}%`,
    `${100 / columns * right}% ${heightPerc}%`,
    `${100 / columns * left}% ${heightPerc}%`
  ];
  return corners.join(",");
}

// app/lib/sanityImageUrl.ts
var import_image_url = __toModule(require("@sanity/image-url"));
var {projectId, dataset} = config;
var builder = (0, import_image_url.default)({projectId, dataset});
function sanityImageUrl(source) {
  return builder.image(source);
}

// app/components/Banner.tsx
var Banner = () => {
  var _a, _b;
  const {pathname} = (0, import_react_router.useLocation)();
  const matches = (0, import_remix3.useMatches)();
  const [isHome, setIsHome] = (0, import_react.useState)(pathname === "/");
  const [bannerSize, setBannerSize] = (0, import_react.useState)({});
  const [bannerImage, setBannerImage] = (0, import_react.useState)(null);
  const {width: windowWidth} = (0, import_usehooks_ts2.useWindowSize)();
  function updateBannerSize(useHomeSize = false) {
    const checkHomeSize = window && typeof useHomeSize === "undefined" ? window.location.pathname === "/" : useHomeSize;
    const bannerHomeMobile = {
      wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
      image: {scale: 1, x: 0}
    };
    const bannerPostMobile = {
      wrapper: {clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`},
      image: {scale: 1, x: 0}
    };
    const bannerHomeTablet = {
      wrapper: {clipPath: `polygon(${clipPathInset(12, 1, 4, 1)})`},
      image: {scale: 1 / 12 * 10, x: `${100 / 12 * 2}%`}
    };
    const bannerPostTablet = {
      wrapper: {clipPath: `polygon(${clipPathInset(12, 0, 1, 0)})`},
      image: {scale: 1, x: `-10%`}
    };
    const bannerHomeDesktop = {
      wrapper: {clipPath: `polygon(${clipPathInset(16, 1, 6, 1)})`},
      image: {scale: 1 / 16 * 15, x: `${100 / 16 * 2}%`}
    };
    const bannerPostDesktop = {
      wrapper: {clipPath: `polygon(${clipPathInset(16, 0, 3, 0)})`},
      image: {scale: 1, x: `-20%`}
    };
    switch (true) {
      case (windowWidth >= 768 && windowWidth < 1024):
        setBannerSize(checkHomeSize ? bannerHomeTablet : bannerPostTablet);
        break;
      case windowWidth >= 1024:
        setBannerSize(checkHomeSize ? bannerHomeDesktop : bannerPostDesktop);
        break;
      default:
        setBannerSize(checkHomeSize ? bannerHomeMobile : bannerPostMobile);
        break;
    }
  }
  (0, import_react.useEffect)(() => {
    var _a2, _b2;
    if (matches.length) {
      const thisPathData = (_a2 = matches.find((match) => pathname === "/" ? match.handle === "home" : match.handle === "article")) == null ? void 0 : _a2.data;
      if (thisPathData) {
        const image = pathname === "/" ? thisPathData == null ? void 0 : thisPathData.articles[0].image : (_b2 = thisPathData == null ? void 0 : thisPathData.initialData) == null ? void 0 : _b2.image;
        if (image) {
          setBannerImage(image);
        }
      }
    }
  }, [pathname]);
  (0, import_react.useEffect)(() => {
    if (typeof window !== "undefined") {
      updateBannerSize();
      window.addEventListener("resize", () => updateBannerSize());
    }
  }, []);
  (0, import_react.useEffect)(() => {
    const locationIsHome = pathname === "/";
    setIsHome(locationIsHome);
    updateBannerSize(locationIsHome);
  }, [pathname, windowWidth]);
  if (!windowWidth)
    return null;
  return /* @__PURE__ */ React.createElement(import_framer_motion.motion.div, {
    animate: __objSpread(__objSpread({}, bannerSize.wrapper), {opacity: 1}),
    transition: {duration: 0.4},
    className: `pointer-events-none h-32 md:h-screen opacity-0 w-screen z-40 origin-top-left ${isHome ? `fixed` : `absolute md:fixed`}`
  }, bannerImage && /* @__PURE__ */ React.createElement(import_framer_motion.motion.div, {
    className: "absolute inset-0 h-32 md:h-screen md:right-auto md:w-4/12 lg:w-6/16 bg-blue-500",
    initial: __objSpread({opacity: 0}, bannerSize.image),
    animate: __objSpread({opacity: 1}, bannerSize.image),
    exit: __objSpread({opacity: 0}, bannerSize.image),
    transition: {duration: 0.2}
  }, bannerImage && /* @__PURE__ */ React.createElement(import_framer_motion.AnimatePresence, null, /* @__PURE__ */ React.createElement(import_framer_motion.motion.img, {
    key: (_a = bannerImage == null ? void 0 : bannerImage.asset) == null ? void 0 : _a._id,
    src: sanityImageUrl(bannerImage).height(1200).width(600).toString(),
    alt: (_b = bannerImage == null ? void 0 : bannerImage.altText) != null ? _b : null,
    className: "hidden md:block w-full h-full object-fill",
    initial: {opacity: 0},
    animate: {opacity: 1},
    exit: {opacity: 0}
  }))));
};
var Banner_default = Banner;

// app/components/Grid.tsx
function Grid() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "pointer-events-none fixed inset-0 w-screen h-screen grid grid-cols-6 md:grid-cols-12 lg:grid-cols-16"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden md:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden lg:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden lg:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-r border-red-500 hidden lg:block"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "border-red-500 hidden lg:block"
  }));
}

// app/lib/queries.tsx
var import_groq_store = __toModule(require("@sanity/groq-store"));
var siteMetaQuery = import_groq_store.groq`*[_id == "siteMeta"][0]`;
var articleQuery = import_groq_store.groq`*[_type == "article" && slug.current == $slug][0]{
    ...,
    image {
      ...,
      asset->
    },
    content[] {
        ...,
        _type == "image" => {
            ...,
            asset->
        },
    }
  }`;
var homeQuery = import_groq_store.groq`*[_type == "article" && defined(slug.current)]|order(published desc){
    _id,
    title,
    "slug": slug.current,
    published,
    updated,
    summary,
    image {
      ...,
      asset->
    }
  }`;

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/root.tsx
var handle = `root`;
var links = () => {
  return [{rel: "stylesheet", href: global_default}];
};
var loader = async ({params}) => {
  const siteMeta = await getClient().fetch(siteMetaQuery);
  return {siteMeta};
};
function Document({
  children,
  title
}) {
  const {isDarkMode} = (0, import_usehooks_ts3.useDarkMode)();
  const data = (0, import_remix4.useLoaderData)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("link", {
    rel: "icon",
    href: "/favicon.png",
    type: "image/png"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1,viewport-fit=cover"
  }), title ? /* @__PURE__ */ React.createElement("title", null, title) : null, /* @__PURE__ */ React.createElement(import_remix4.Meta, null), /* @__PURE__ */ React.createElement(import_remix4.Links, null)), /* @__PURE__ */ React.createElement("body", {
    className: `transition-colors duration-100 ease-out ${isDarkMode ? `dark text-white bg-blue-900` : ``}`
  }, children, /* @__PURE__ */ React.createElement(import_remix4.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(Grid, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React.createElement(import_remix4.LiveReload, null)));
}
function App() {
  let data = (0, import_remix4.useLoaderData)();
  const {siteMeta} = data;
  return /* @__PURE__ */ React.createElement(Document, null, /* @__PURE__ */ React.createElement(Header_default, {
    siteMeta
  }), /* @__PURE__ */ React.createElement(Banner_default, null), /* @__PURE__ */ React.createElement("main", {
    className: "px-4 md:px-0 grid grid-cols-6 md:grid-cols-12 lg:grid-cols-16 min-h-screen w-screen"
  }, /* @__PURE__ */ React.createElement(import_react_router_dom.Outlet, null)));
}
function CatchBoundary() {
  let caught = (0, import_remix4.useCatch)();
  switch (caught.status) {
    case 401:
    case 404:
      return /* @__PURE__ */ React.createElement(Document, {
        title: `${caught.status} ${caught.statusText}`
      }, /* @__PURE__ */ React.createElement("h1", null, caught.status, " ", caught.statusText));
    default:
      throw new Error(`Unexpected caught response with status: ${caught.status}`);
  }
}
function ErrorBoundary({error}) {
  console.error(error);
  return /* @__PURE__ */ React.createElement(Document, {
    title: "Uh-oh!"
  }, /* @__PURE__ */ React.createElement("h1", null, "App Error"), /* @__PURE__ */ React.createElement("pre", null, error.message), /* @__PURE__ */ React.createElement("p", null, "Replace this UI with what you want users to see when your app throws uncaught errors."));
}

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/routes/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => Article,
  handle: () => handle2,
  loader: () => loader2,
  meta: () => meta
});
var import_remix5 = __toModule(require("remix"));

// app/components/PortableText.tsx
var import_react2 = __toModule(require("react"));
var import_block_content_to_react = __toModule(require("@sanity/block-content-to-react"));
var import_get_youtube_id = __toModule(require("get-youtube-id"));

// app/components/Button.tsx
var import_react_router_dom2 = __toModule(require("react-router-dom"));
var Button = ({
  children,
  to,
  className,
  href,
  disabled,
  target,
  type
}) => {
  if (type === "submit") {
    return /* @__PURE__ */ React.createElement("button", {
      disabled,
      className: `button ${className || ""}`,
      type: "submit"
    }, /* @__PURE__ */ React.createElement("span", {
      className: "px-3"
    }, children));
  }
  const attributes = {};
  if (target === "_blank") {
    attributes.target = "_blank";
    attributes.rel = "noopener";
  }
  if (href) {
    return /* @__PURE__ */ React.createElement("a", __objSpread(__objSpread({}, attributes), {
      className: `button ${className || ""}`,
      href
    }), /* @__PURE__ */ React.createElement("span", {
      className: "hidden md:block w-6 border-t border-white"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "px-3"
    }, children), /* @__PURE__ */ React.createElement("span", {
      className: "hidden md:block w-6 border-t border-white"
    }));
  }
  return /* @__PURE__ */ React.createElement(import_react_router_dom2.Link, {
    className: `button ${className || ""}`,
    to
  }, children);
};
var Button_default = Button;

// app/components/Prism.tsx
var import_prism_react_renderer = __toModule(require("prism-react-renderer"));
var import_github = __toModule(require("prism-react-renderer/themes/github"));
function Prism({code = ``, language = `plaintext`}) {
  return /* @__PURE__ */ React.createElement(import_prism_react_renderer.default, __objSpread(__objSpread({}, import_prism_react_renderer.defaultProps), {
    code,
    language,
    theme: import_github.default
  }), ({className, style, tokens, getLineProps, getTokenProps}) => /* @__PURE__ */ React.createElement("pre", {
    className,
    style
  }, tokens.map((line, i) => /* @__PURE__ */ React.createElement("div", __objSpread({}, getLineProps({line, key: i})), line.map((token, key) => /* @__PURE__ */ React.createElement("span", __objSpread({}, getTokenProps({token, key}))))))));
}

// app/components/PortableText.tsx
var {projectId: projectId2, dataset: dataset2} = config;
var BlockRenderer = (props) => {
  var _a;
  const {style = "normal"} = props.node;
  if (/^h\d/.test(style)) {
    return import_react2.default.createElement(style, {id: props.node._key}, props.children);
  }
  if (["code", "pre"].includes(style)) {
    const text = (_a = props == null ? void 0 : props.node) == null ? void 0 : _a.children.map(({text: text2}) => text2).join("");
    return text ? /* @__PURE__ */ import_react2.default.createElement(Prism, {
      code: text
    }) : null;
  }
  return import_block_content_to_react.default.defaultSerializers.types.block(props);
};
var serializers = {
  container: ({children}) => children,
  types: {
    block: BlockRenderer,
    video: ({node}) => {
      var _a;
      const id = (0, import_get_youtube_id.default)(node.url);
      return /* @__PURE__ */ import_react2.default.createElement("a", {
        href: node.url,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /* @__PURE__ */ import_react2.default.createElement("img", {
        src: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        loading: "lazy",
        alt: (_a = node == null ? void 0 : node.title) != null ? _a : ``,
        className: "w-full h-full object-cover"
      }));
    },
    break: () => /* @__PURE__ */ import_react2.default.createElement("hr", null),
    image: ({node}) => {
      var _a;
      return /* @__PURE__ */ import_react2.default.createElement("p", {
        className: "-mx-4 border-t border-b md:border border-gray-100"
      }, /* @__PURE__ */ import_react2.default.createElement("img", {
        loading: "lazy",
        src: sanityImageUrl(node.asset).width(800).toString(),
        alt: (_a = node == null ? void 0 : node.asset) == null ? void 0 : _a.altText,
        className: "w-full h-auto"
      }));
    },
    code: ({node}) => (node == null ? void 0 : node.code) ? /* @__PURE__ */ import_react2.default.createElement(Prism, {
      code: node.code,
      language: node == null ? void 0 : node.language
    }) : null,
    button: ({node}) => /* @__PURE__ */ import_react2.default.createElement(Button_default, {
      href: node.link.link
    }, node.link.text)
  }
};
function PortableText({blocks}) {
  return /* @__PURE__ */ import_react2.default.createElement(import_block_content_to_react.default, {
    blocks,
    serializers,
    projectId: projectId2,
    dataset: dataset2
  });
}

// app/components/ProseableText.tsx
function ProseableText({blocks = []}) {
  const blockGroups = blocks.reduce((acc, item) => {
    const lastIdx = acc.length - 1;
    if (acc[lastIdx].length === 0 || acc[lastIdx][0]._type === item._type) {
      acc[lastIdx].push(item);
    } else {
      acc.push([item]);
    }
    return acc;
  }, [[]]);
  if (!(blockGroups == null ? void 0 : blockGroups.length))
    return null;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, blockGroups.map((group) => group[0]._type === "block" ? /* @__PURE__ */ React.createElement("div", {
    key: group[0]._key,
    className: "prose md:prose-lg dark:prose-dark prose-blue my-4 md:my-8"
  }, /* @__PURE__ */ React.createElement(PortableText, {
    blocks: group
  })) : /* @__PURE__ */ React.createElement(PortableText, {
    key: group[0]._key,
    blocks: group
  })));
}

// app/components/Label.tsx
var import_react3 = __toModule(require("react"));
function Label({children}) {
  return /* @__PURE__ */ import_react3.default.createElement("p", {
    className: "text-xs font-mono text-blue-700 dark:text-blue-100 uppercase"
  }, children);
}

// app/components/Date.tsx
var import_react4 = __toModule(require("react"));
function Date({
  updated,
  published
}) {
  return /* @__PURE__ */ import_react4.default.createElement(Label, null, /* @__PURE__ */ import_react4.default.createElement("span", {
    className: "flex flex-col md:flex-row md:items-center"
  }, updated ? /* @__PURE__ */ import_react4.default.createElement("span", null, "Updated ", updated, " ", /* @__PURE__ */ import_react4.default.createElement("span", {
    className: "opacity-50"
  }, "// Published ", published)) : /* @__PURE__ */ import_react4.default.createElement("span", null, published)));
}

// app/components/TableOfContents.tsx
function TableOfContents({blocks}) {
  const headings = blocks.filter((block) => ["h2", "h3"].includes(block.style));
  if (!(headings == null ? void 0 : headings.length)) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("ul", {
    className: "grid grid-cols-1 gap-y-4 font-mono text-xs sticky top-0"
  }, headings.map((heading) => /* @__PURE__ */ React.createElement("li", {
    key: heading._key,
    className: heading.style === "h3" ? `pl-3` : ``,
    style: {textIndent: heading.style === "h3" ? `-0.75rem` : ``}
  }, /* @__PURE__ */ React.createElement("a", {
    href: `#${heading._key}`,
    className: "text-blue-500 dark:text-blue-200 hover:text-white dark:hover:text-white hover:bg-blue-500 block"
  }, heading.style === "h3" ? `\u2013 ` : ``, heading.children.map((child) => child.text).join("")))));
}

// app/hooks/usePreviewSubscription.tsx
var import_react5 = __toModule(require("react"));
function usePreviewSubscription(query, subscriptionOptions) {
  const {enabled, params, initialData} = subscriptionOptions;
  const [data, setData] = (0, import_react5.useState)(initialData);
  let sub;
  let store;
  (0, import_react5.useEffect)(() => {
    if (enabled) {
      sub = store.subscribe(query, params != null ? params : {}, (err, result) => {
        if (err) {
          console.error("Oh no, an error:", err);
          return;
        }
        setData(result);
      });
    }
    return () => {
      if (sub)
        sub.unsubscribe();
      if (store)
        store.close();
    };
  }, []);
  return {data};
}

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/routes/$slug.tsx
var handle2 = `article`;
var meta = ({data, parentsData, location}) => {
  var _a, _b;
  const {title, summary, image} = (_a = data == null ? void 0 : data.initialData) != null ? _a : {};
  const {siteMeta} = (_b = parentsData == null ? void 0 : parentsData.root) != null ? _b : {};
  const canonical = (siteMeta == null ? void 0 : siteMeta.siteUrl) + location.pathname;
  const imageWidth = 1200;
  const imageHeight = 630;
  const imageMeta = image ? {
    "og:image:width": image ? String(imageWidth) : null,
    "og:image:height": image ? String(imageHeight) : null,
    "og:image": image ? sanityImageUrl(image).height(imageHeight).width(imageWidth).toString() : null
  } : {};
  return __objSpread({
    "theme-color": "#2522fc",
    title: `${title} | ${siteMeta == null ? void 0 : siteMeta.title}`,
    description: summary,
    canonical,
    "twitter:card": "summary_large_image",
    "twitter:creator": siteMeta == null ? void 0 : siteMeta.author,
    "twitter:title": title,
    "twitter:description": siteMeta == null ? void 0 : siteMeta.description,
    type: "website",
    "og:url": canonical
  }, imageMeta);
};
var loader2 = async ({params}) => {
  const preview = false;
  const article = await getClient(preview).fetch(articleQuery, params);
  return {initialData: article, query: articleQuery, params, preview};
};
function Article() {
  var _a, _b;
  let {initialData, query, params, preview} = (0, import_remix5.useLoaderData)();
  const {data: article} = usePreviewSubscription(query, {
    params,
    initialData,
    enabled: preview
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "mt-48 md:mt-0 row-start-1 col-span-6 md:col-start-3 md:col-span-10 lg:col-start-5 lg:col-span-11"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "py-12 md:py-24 max-w-xl"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "leading-none font-black mb-8 tracking-tighter text-4xl md:text-6xl text-blue-500"
  }, article.title), /* @__PURE__ */ React.createElement("p", {
    className: "text-lg dark:text-blue-100 md:leading-8 font-mono"
  }, article.summary))), /* @__PURE__ */ React.createElement("aside", {
    className: "mb-4 md:mb-0 row-start-2 md:row-start-2 col-span-6 md:col-start-3 md:col-span-3 lg:col-start-5 lg:col-span-3 relative"
  }, ((_a = article == null ? void 0 : article.content) == null ? void 0 : _a.length) > 0 ? /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-cols-1 gap-y-4 md:pr-12 sticky top-6"
  }, /* @__PURE__ */ React.createElement(Label, null, "Table of Contents"), /* @__PURE__ */ React.createElement(TableOfContents, {
    blocks: article.content
  })) : null), /* @__PURE__ */ React.createElement("section", {
    className: "row-start-3 md:row-start-2 col-span-6 lg:col-start-8 lg:col-span-8 pb-24"
  }, /* @__PURE__ */ React.createElement(Date, {
    updated: article == null ? void 0 : article.updated,
    published: article == null ? void 0 : article.published
  }), ((_b = article == null ? void 0 : article.content) == null ? void 0 : _b.length) > 0 ? /* @__PURE__ */ React.createElement(ProseableText, {
    blocks: article.content
  }) : null));
}

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index,
  handle: () => handle3,
  loader: () => loader3,
  meta: () => meta2
});
var import_remix6 = __toModule(require("remix"));
var import_remix7 = __toModule(require("remix"));

// app/components/Intro.tsx
function Intro({blocks = []}) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bg-blue-500 text-white font-mono md:text-lg p-4 md:p-8 intro"
  }, /* @__PURE__ */ React.createElement(PortableText, {
    blocks
  }));
}

// route-module:/Users/simeongriggs/Sites/simeonGriggs/remix/app/routes/index.tsx
var handle3 = `home`;
var meta2 = ({parentsData}) => {
  var _a;
  const {siteMeta} = (_a = parentsData == null ? void 0 : parentsData.root) != null ? _a : {};
  return {
    title: `${siteMeta == null ? void 0 : siteMeta.title} - ${siteMeta == null ? void 0 : siteMeta.description}`,
    description: siteMeta == null ? void 0 : siteMeta.description
  };
};
var loader3 = async () => {
  const articles = await getClient().fetch(homeQuery);
  return {articles};
};
function Index() {
  var _a, _b, _c;
  let {articles} = (0, import_remix7.useLoaderData)();
  const matches = (0, import_remix6.useMatches)();
  const {bio} = (_c = (_b = (_a = matches == null ? void 0 : matches.find((match) => match.handle === "root")) == null ? void 0 : _a.data) == null ? void 0 : _b.siteMeta) != null ? _c : {};
  return /* @__PURE__ */ React.createElement("section", {
    className: "mt-48 md:mt-0 col-span-6 md:col-start-6 lg:col-start-8 md:col-span-6 lg:col-span-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "grid grid-cols-1 gap-y-12 md:gap-y-24 pt-12 md:py-48"
  }, /* @__PURE__ */ React.createElement("article", {
    className: "prose prose-lg prose-blue"
  }, /* @__PURE__ */ React.createElement("h1", null, /* @__PURE__ */ React.createElement("span", {
    className: "wave"
  }, "\u{1F44B}"), " Hey!")), (bio == null ? void 0 : bio.length) > 0 ? /* @__PURE__ */ React.createElement(Intro, {
    blocks: bio
  }) : null, articles.map((article) => /* @__PURE__ */ React.createElement("article", {
    key: article._id,
    className: "grid grid-cols-1 gap-y-4"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "leading-none font-black tracking-tighter text-2xl md:text-4xl text-blue-500"
  }, /* @__PURE__ */ React.createElement(import_remix7.Link, {
    to: `/${article.slug}`,
    prefetch: "intent",
    className: "block hover:bg-blue-500 hover:text-white"
  }, article.title)), /* @__PURE__ */ React.createElement(Date, {
    updated: article == null ? void 0 : article.updated,
    published: article == null ? void 0 : article.published
  }), /* @__PURE__ */ React.createElement("div", {
    className: "prose prose-lg dark:prose-dark prose-blue"
  }, /* @__PURE__ */ React.createElement("p", null, article.summary))))));
}

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = {module: entry_server_exports};
var routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/$slug": {
    id: "routes/$slug",
    parentId: "root",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
