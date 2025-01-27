import { createBrowserHistory, History } from 'history';
import React from 'react';

let navigateTo: string | null = null;

export const navigate = (url: string): void => {
  navigateTo = url;
  forceUpdate();
};

const resetNavigateTo = (): void => {
  navigateTo = null;
};

let updateListeners: (() => void)[] = [];

const forceUpdate = (): void => {
  updateListeners.forEach(listener => listener());
};

export const addUpdateListener = (listener: () => void): void => {
  updateListeners.push(listener);
};

export const removeUpdateListener = (listener: () => void): void => {
  updateListeners = updateListeners.filter(l => l !== listener);
};

export const history: History = createBrowserHistory();

export const NavigateComponent = (): JSX.Element | null => {
  const [random, setRandom] = React.useState<number>(0);

  React.useEffect(() => {
    const handleUpdate = (): void => {
      setRandom(Math.random());
    };
    addUpdateListener(handleUpdate);
    return () => removeUpdateListener(handleUpdate);
  }, []);

  if (navigateTo) {
    const urlToNavigate: string = navigateTo;
    resetNavigateTo();
    history.push(urlToNavigate);
    return null;
  }

  return null;
};