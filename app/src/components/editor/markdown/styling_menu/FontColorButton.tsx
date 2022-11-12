import React, { useCallback } from "react";
import * as styles from "./FontColorButton.module.css";
import ColorPickerButton2 from "../../../../widgets/color/ColorPickerButton2";
import { AppState, AuthoringState, Theme } from "../../../../domain/schema";
import mutations from "../../../../domain/mutations";
import "@tiptap/extension-color";
import queries from "../../../../domain/queries";
import { Ctx, pick0, useQueryA } from "../../../../hooks";

type Props = {
  ctx: Ctx;
  state: AuthoringState;
  theme: Theme;
};

export default function FontColorButton({ ctx, state, theme }: Props) {
  const recentColors = pick0(
    useQueryA<[string]>(...queries.recentColors(ctx, theme.id)).data
  );
  // useBind(["transaction"], state);
  // useQuery(["recentColors"], theme);
  const onColorChange = useCallback(
    (color: string | undefined) => {
      if (color == null) {
        return false;
      }
      if (color === "default") {
        state.editor?.chain().focus().unsetColor().run();
      } else {
        state.editor?.chain().focus().setColor(color).run();
        mutations.addRecentColor(ctx, color, theme.id);
      }

      return false;
    },
    [state]
  );
  const color = state.editor?.getAttributes("textStyle").color;
  let style;
  if (color) {
    style = {
      background: color,
    };
  }
  return (
    <ColorPickerButton2
      onChange={onColorChange}
      color={color || "default"}
      recents={recentColors}
    >
      <strong>A</strong>
      <div className={styles.fontColor} style={style}></div>
    </ColorPickerButton2>
  );
}
