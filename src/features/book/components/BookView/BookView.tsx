import { DefaultView } from "../DefaultView/DefaultView";
import { EditView } from "../EditView/EditView";
import { FocusView } from "../FocusView/FocusView";
import { PlayerProvider } from "../common/Player/store/playerContext";
import { AudioDataProvider } from "../common/Player/store/audioDataContext";
import { usePrefetchPages } from "#book/hooks/usePrefetchPages";
import { useSetupShortcuts } from "#book/hooks/useSetupShortcuts";
import { useView } from "#book/hooks/useView";

export function BookView() {
  const { view } = useView();
  usePrefetchPages();
  useSetupShortcuts();

  return (
    <>
      <PlayerProvider>
        <AudioDataProvider>
          {view === "default" && <DefaultView />}
          {view === "focus" && <FocusView />}
        </AudioDataProvider>
      </PlayerProvider>
      {view === "edit" && <EditView />}
    </>
  );
}
