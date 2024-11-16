import React, {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  FormEvent,
  FormEventHandler,
  forwardRef,
} from "react";
import { MathfieldElement, MathfieldOptions } from "mathlive";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<Props, MathfieldElement>;
    }
  }
}

export interface Props extends React.HTMLAttributes<MathfieldElement> {
  // "Standard" event listeners (handled by React)
  onBeforeInput?: FormEventHandler<MathfieldElement> | undefined;
  onInput?: FormEventHandler<MathfieldElement> | undefined;
  onFocus?: FocusEventHandler<MathfieldElement> | undefined;
  onBlur?: FocusEventHandler<MathfieldElement> | undefined;
  onChange?: ChangeEventHandler<MathfieldElement> | undefined;

  // Supplemental event listeners
  onKeydown?: (evt: KeyboardEvent) => void;
  onMoveOutOf?: EventListener | undefined;
  onSelectionChange?: EventListener | undefined;
  onUndoStateChange?: EventListener | undefined;
  onModeChange?: EventListener | undefined;

  value?: string;
  readonly?: boolean;
  defaultMode?: "inline-math" | "math" | "text";
  letterShapeStyle?: "tex" | "french" | "iso" | "upright" | "auto";
  minFontScale?: number;
  mathModeSpace?: string;
  removeExtraneousParentheses?: boolean;
  smartFence?: boolean;
  smartMode?: boolean;
  smartSuperscript?: boolean;
  inlineShortcutTimeout?: number;
  scriptDepth?: number;
  placeholder?: string;
  mathVirtualKeyboardPolicy?: "off" | "sandboxed" | "manual";
  virtualKeyboardTargetOrigin?: string;
  options?: MathfieldOptions;
}

export const Mathfield = forwardRef<MathfieldElement, Props>((props, ref) => {
  const {
    children,
    readonly,
    onChange,
    onKeydown,
    onMoveOutOf,
    onSelectionChange,
    onUndoStateChange,
    onModeChange,
    options,
    ...rest
  } = props;

  if (children && typeof children !== "string") {
    throw new Error(
      "The Mathfield component only accepts a string as children",
    );
  }

  //
  // This function is called when the component is first rendered
  // (which might be after the component is mounted) and before
  // it is unmounted (with a null argument).
  //
  // Use it to set the forward ref and any required event listeners.
  //
  // It is wrapped in a useCallback to avoid creating a new function
  // on every render.
  //
  const afterRender = React.useCallback((mf: MathfieldElement | null) => {
    if (mf === null) {
      //
      // The mathfield is about to be unmounted. Stop listening to events.
      //
      if (onKeydown) mf.removeEventListener("keydown", onKeydown);
      if (onModeChange) mf.removeEventListener("mode-change", onModeChange);
      if (onMoveOutOf) mf.removeEventListener("move-out", onMoveOutOf);
      if (onSelectionChange)
        mf.removeEventListener("selection-change", onSelectionChange);
      if (onUndoStateChange)
        mf.removeEventListener("undo-state-change", onUndoStateChange);
    } else {
      // For historical reasons, the React onChange handler corresponds
      // to the 'input' event in the Mathfield.
      if (typeof onChange === "function")
        mf.addEventListener("input", (evt) =>
          onChange(evt as unknown as ChangeEvent<MathfieldElement>),
        );

      // Add event listeners for events that are *not* handled by React
      if (typeof onKeydown === "function")
        mf.addEventListener("keydown", onKeydown);
      if (typeof onModeChange === "function")
        mf.addEventListener("mode-change", onModeChange);
      if (typeof onMoveOutOf === "function")
        mf.addEventListener("move-out", onMoveOutOf);
      if (typeof onSelectionChange === "function")
        mf.addEventListener("selection-change", onSelectionChange);
      if (typeof onUndoStateChange === "function")
        mf.addEventListener("undo-state-change", onUndoStateChange);
    }

    // If the user has provided a ref, update it
    if (typeof ref === "function") ref(mf);
    else if (ref) ref.current = mf;
  }, []);

  // return (
  //   <math-field
  //     ref={onAfterRender}
  //     readonly={readonly}
  //     default-mode={props.defaultMode}
  //     letter-shape-style={props.letterShapeStyle}
  //     min-font-scale={props.minFontScale}
  //     math-mode-space={props.mathModeSpace}
  //     smart-mode={props.smartMode}
  //     smart-fence={props.smartFence}
  //     smart-superscript={props.smartSuperscript}
  //     scriptDepth={props.scriptDepth}
  //     inline-shortcut-timeout={props.inlineShortcutTimeout}
  //     placeholder={props.placeholder}
  //     math-virtual-keyboard-policy={props.mathVirtualKeyboardPolicy}
  //     virtual-keyboard-target-origin={props.virtualKeyboardTargetOrigin}
  //     {...rest}
  //   >
  //     {children}
  //   </math-field>
  // );
  return React.createElement(
    "math-field",
    { ...rest, ref: afterRender },
    children,
  );
});

Mathfield.displayName = "Mathfield";

export default Mathfield;
