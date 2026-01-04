import { createContext, type ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";

interface BookContextValue {
  drawer: {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
  };
  themeForm: {
    isOpen: boolean;
    toggle: () => void;
    close: () => void;
    open: () => void;
  };
}

const BookContext = createContext<BookContextValue | null>(null);

function BookContextProvider({ children }: { children: ReactNode }) {
  const [
    isDrawerOpen,
    { toggle: toggleDrawer, close: closeDrawer, open: openDrawer },
  ] = useDisclosure(false);
  const [
    isThemeFormOpen,
    { toggle: toggleThemeForm, close: closeThemeForm, open: openThemeForm },
  ] = useDisclosure(false);

  return (
    <BookContext.Provider
      value={{
        drawer: {
          isOpen: isDrawerOpen,
          toggle: toggleDrawer,
          close: closeDrawer,
          open: openDrawer,
        },
        themeForm: {
          isOpen: isThemeFormOpen,
          toggle: toggleThemeForm,
          close: closeThemeForm,
          open: openThemeForm,
        },
      }}>
      {children}
    </BookContext.Provider>
  );
}

export { BookContextProvider, BookContext };
