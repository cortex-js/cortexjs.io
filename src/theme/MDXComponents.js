import React from "react";
// Import the original mapper
import MDXComponents from "@theme-original/MDXComponents";

import HeroImage from "@site/src/components/HeroImage";
import Latex from "@site/src/components/Latex";
import ReadMore from "@site/src/components/ReadMore";
import Icon from "@site/src/components/Icon";
import LatexCommands from "@site/src/components/LatexCommands";
import RadioButton from "@site/src/components/RadioButton";
import SwitchButton from "@site/src/components/SwitchButton";

import FunctionDefinition from "@site/src/components/FunctionDefinition";
import Signature from "@site/src/components/Signature";

import Intro from "@site/src/components/Intro";

export default {
  // Re-use the default mapping
  ...MDXComponents,
  // Add custom components
  RadioButton,
  SwitchButton,
  ReadMore,
  HeroImage,
  Latex,
  LatexCommands,
  Icon,
  Intro,
  FunctionDefinition,
  Signature,
};
