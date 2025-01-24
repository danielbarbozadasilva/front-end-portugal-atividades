import { createBrowserHistory, History } from 'history';
import React from 'react';

// Crie uma instância do histórico que você possa manipular
export const history: History = createBrowserHistory();

let navigateTo: string | null = null;

// Função para acionar a navegação
export const navigate = (url: string): void => {
  navigateTo = url;
  // Força uma atualização no componente NavigateComponent
  forceUpdate();
};

// Função para limpar o estado de navegação
const resetNavigateTo = (): void => {
  navigateTo = null;
};

// Ouvintes de atualização
let updateListeners: (() => void)[] = [];

// Força a atualização dos ouvintes
const forceUpdate = (): void => {
  updateListeners.forEach(listener => listener());
};

// Adiciona um ouvinte de atualização
export const addUpdateListener = (listener: () => void): void => {
  updateListeners.push(listener);
};

// Remove um ouvinte de atualização
export const removeUpdateListener = (listener: () => void): void => {
  updateListeners = updateListeners.filter(l => l !== listener);
};

// Componente para lidar com o redirecionamento
export const NavigateComponent = (): JSX.Element | null => {
  const [random, setRandom] = React.useState<number>(0);

  React.useEffect(() => {
    const handleUpdate = (): void => {
      // Trigger re-render
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