import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      vibrantPrimary: string;
      vibrantSecondary: string;
      vibrantTertiary: string;
      vibrantAccent: string;
      vibrantDark: string;
      vibrantLightGray: string;
      vibrantGray: string;
    };
  }
}
