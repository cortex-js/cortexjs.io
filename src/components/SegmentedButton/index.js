import styles from "./styles.module.css";

import { useId } from "react";

export function SegmentedButtonItem({ name, value, label, onChange }) {
  const id = useId();
  return (
    <>
      <input type="radio" name={name} value={value} id={id} />
      <label htmlFor={id}>{label}</label>
    </>
  );
}

export default function ({ children, onChange, ...props }) {
  return (
    <div class={styles.segmentedButton} style="--segments: 4">
      <Item value="auto">Auto</Item>
      {/* <input
        type="radio"
        name="numeric-format"
        value="auto"
        id="numeric-format-auto"
        checked
      />
      <label for="numeric-format-auto">auto</label>
      <input
        type="radio"
        name="numeric-format"
        value="machine"
        id="numeric-format-machine"
      />
      <label for="numeric-format-machine">machine</label>
      <input
        type="radio"
        name="numeric-format"
        value="decimal"
        id="numeric-format-decimal"
      />
      <label for="numeric-format-decimal">bignum</label>
      <input
        type="radio"
        name="numeric-format"
        value="complex"
        id="numeric-format-complex"
      />
      <label for="numeric-format-complex">complex</label> */}
    </div>
  );
}
