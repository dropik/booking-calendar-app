import React, { useEffect, useState } from "react";

import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";

export default function M3TargaAutocomplete<T, Multple extends boolean | undefined, FreeSolo extends boolean | undefined>(
  { ...props }: AutocompleteProps<T, Multple, boolean, FreeSolo>): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState<"top" | "bottom">("top");

  useEffect(() => {
    if (isOpen) {
      setIsOpening(true);
    }
  }, [isOpen]);

  return (
    <FormControl fullWidth>
      <Autocomplete
        {...props}
        disableClearable
        forcePopupIcon={false}
        size="small"
        open={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpening(false)}
        slotProps={{
          popper: {
            keepMounted: true,
            modifiers: [
              {
                name: "setTransformOrigin",
                enabled: true,
                phase: "main",
                fn: ({ state }) => {
                  if (state.placement === "top") {
                    setTransformOrigin("bottom");
                  } else {
                    setTransformOrigin("top");
                  }
                }
              }
            ]
          },
          paper: {
            className: isOpening ? "opening" : undefined,
            elevation: isOpening ? 2 : 0,
            sx: {
              backgroundColor: (theme) => theme.palette.surface.main,
              transformOrigin: transformOrigin,
              transition: (theme) => theme.transitions.create(
                ["transform", "opacity", "box-shadow"],
                {
                  duration: isOpening ? theme.transitions.duration.medium4 : theme.transitions.duration.standard,
                  easing: isOpening ? theme.transitions.easing.emphasizedDecelerate : theme.transitions.easing.emphasized,
                }),
              transform: "scaleY(0)",
              opacity: 0,
              "&.opening": {
                transform: "scaleY(1)",
                opacity: 1,
              },
              "&::after": {
                position: "absolute",
                zIndex: 99999,
                pointerEvents: "none",
                content: "' '",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: (theme) => theme.palette.primary.main,
                opacity: (theme) => theme.opacities.surface5,
              },
              "& .MuiAutocomplete-listbox": {
                overflowY: "overlay",
              }
            },
            onTransitionEnd: () => {
              if (!isOpening) {
                setIsOpen(false);
              }
            }
          },
        }}
      />
    </FormControl>
  );
}
