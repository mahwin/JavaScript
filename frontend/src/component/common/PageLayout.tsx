import styled from "styled-components";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;
