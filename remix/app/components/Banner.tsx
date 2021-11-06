import { useState, useEffect } from "react";
import { useMatches } from "remix";
import { useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowSize } from "usehooks-ts";

import { clipPathInset } from "../lib/helpers";
import sanityImageUrl from "~/lib/sanityImageUrl";

interface BannerSizeImage {
  scale: number;
  x: number;
}

interface BannerSizeWrapper {
  clipPath: string;
}

interface BannerSize {
  image?: BannerSizeImage;
  wrapper?: BannerSizeWrapper;
}

const Banner = () => {
  const { pathname } = useLocation();
  const matches = useMatches();
  const [isHome, setIsHome] = useState(pathname === "/");
  const [bannerSize, setBannerSize]: [BannerSize, any] = useState({});
  const [bannerImage, setBannerImage] = useState(null);
  const { width: windowWidth } = useWindowSize();

  function updateBannerSize(useHomeSize = false) {
    // Double check, if no prop was given we should double check
    const checkHomeSize =
      window && typeof useHomeSize === "undefined"
        ? window.location.pathname === "/"
        : useHomeSize;

    const bannerHomeMobile = {
      wrapper: { clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` },
      image: { scale: 1, x: 0 },
    };

    const bannerPostMobile = {
      wrapper: { clipPath: `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` },
      image: { scale: 1, x: 0 },
    };

    const bannerHomeTablet = {
      wrapper: { clipPath: `polygon(${clipPathInset(12, 1, 4, 1)})` },
      image: { scale: (1 / 12) * 10, x: `${(100 / 12) * 2}%` },
    };

    const bannerPostTablet = {
      wrapper: { clipPath: `polygon(${clipPathInset(12, 0, 1, 0)})` },
      image: { scale: 1, x: `-10%` },
    };

    const bannerHomeDesktop = {
      wrapper: { clipPath: `polygon(${clipPathInset(16, 1, 6, 1)})` },
      image: { scale: (1 / 16) * 15, x: `${(100 / 16) * 2}%` },
    };

    const bannerPostDesktop = {
      wrapper: { clipPath: `polygon(${clipPathInset(16, 0, 3, 0)})` },
      image: { scale: 1, x: `-20%` },
    };

    switch (true) {
      case windowWidth >= 768 && windowWidth < 1024:
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

  // Set initial banner
  useEffect(() => {
    if (matches.length) {
      const thisPathData = matches.find((match: any) =>
        pathname === "/" ? match.handle === "home" : match.handle === "article"
      )?.data;

      if (thisPathData) {
        const image =
          pathname === "/"
            ? thisPathData?.articles[0].image
            : thisPathData?.initialData?.image;
        if (image) {
          setBannerImage(image);
        }
      }
    }
  }, [pathname]);

  // Update banner size on resize
  useEffect(() => {
    if (typeof window !== "undefined") {
      updateBannerSize();

      window.addEventListener("resize", () => updateBannerSize());
    }
  }, []);

  // Update banner size when path changes
  useEffect(() => {
    const locationIsHome = pathname === "/";
    setIsHome(locationIsHome);
    updateBannerSize(locationIsHome);
  }, [pathname, windowWidth]);

  if (!windowWidth) return null;

  return (
    // <bannerContext.Consumer>
    //   {(context) => (
    <motion.div
      animate={{ ...bannerSize.wrapper, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`pointer-events-none h-32 md:h-screen opacity-0 w-screen z-40 origin-top-left ${
        isHome ? `fixed` : `absolute md:fixed`
      }`}
    >
      {bannerImage && (
        <motion.div
          className="absolute inset-0 h-32 md:h-screen md:right-auto md:w-4/12 lg:w-6/16 bg-blue-500"
          initial={{ opacity: 0, ...bannerSize.image }}
          animate={{ opacity: 1, ...bannerSize.image }}
          exit={{ opacity: 0, ...bannerSize.image }}
          transition={{ duration: 0.2 }}
        >
          {bannerImage && (
            <AnimatePresence>
              <motion.img
                key={bannerImage?.asset?._id}
                src={sanityImageUrl(bannerImage)
                  .height(1200)
                  .width(600)
                  .toString()}
                alt={bannerImage?.altText ?? null}
                className="hidden md:block w-full h-full object-fill"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </AnimatePresence>
          )}
        </motion.div>
      )}
    </motion.div>
    //   )}
    // </bannerContext.Consumer>
  );
};

export default Banner;
