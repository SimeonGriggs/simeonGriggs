import type { LinksFunction, LoaderFunction } from "remix";
import {
  Meta,
  Links,
  Scripts,
  useLoaderData,
  LiveReload,
  useCatch,
} from "remix";
import { Outlet } from "react-router-dom";
import { useDarkMode } from "usehooks-ts";

import stylesUrl from "~/styles/global.css";

import Header from "~/components/Header";
import { getClient } from "~/lib/sanityServer";
import { removeTrailingSlash } from "./lib/helpers";
import Banner from "./components/Banner";
import Grid from "./components/Grid";
import { siteMetaQuery } from "./lib/queries";

export const handle = `root`;

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export let loader: LoaderFunction = async ({ params }) => {
  const siteMeta = await getClient().fetch(siteMetaQuery);

  return { siteMeta };
};

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { isDarkMode } = useDarkMode();
  const data = useLoaderData();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* <link
          rel="canonical"
          href={removeTrailingSlash(
            `${data.requestInfo.origin}${data.requestInfo.path}`
          )}
        /> */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
        {title ? <title>{title}</title> : null}
        <Meta />
        <Links />
      </head>
      <body
        className={`transition-colors duration-100 ease-out ${
          isDarkMode ? `dark text-white bg-blue-900` : ``
        }`}
      >
        {children}

        <Scripts />
        {process.env.NODE_ENV === "development" && <Grid />}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  let data = useLoaderData();
  const { siteMeta } = data;

  return (
    <Document>
      <Header siteMeta={siteMeta} />
      <Banner />
      <main className="px-4 md:px-0 grid grid-cols-6 md:grid-cols-12 lg:grid-cols-16 min-h-screen w-screen">
        <Outlet />
      </main>
    </Document>
  );
}

export function CatchBoundary() {
  let caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404:
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );

    default:
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
