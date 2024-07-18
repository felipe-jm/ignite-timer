import { ThemeProvider } from "styled-components";

import { Button } from "./components/Button";
import { defaultTheme } from "./styles/default";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="danger">Teste</Button>
      <Button variant="success">Teste</Button>
      <Button variant="primary">Teste</Button>
      <Button variant="secondary">Teste</Button>

      <GlobalStyle />
    </ThemeProvider>
  );
}
