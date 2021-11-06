import React from "react";

import Label from "./Label";

export default function Date({
  updated,
  published,
}: {
  updated?: string;
  published: string;
}) {
  return (
    <Label>
      <span className="flex flex-col md:flex-row md:items-center">
        {updated ? (
          <span>
            Updated {updated}{" "}
            <span className="opacity-50">// Published {published}</span>
          </span>
        ) : (
          <span>{published}</span>
        )}
      </span>
    </Label>
  );
}
