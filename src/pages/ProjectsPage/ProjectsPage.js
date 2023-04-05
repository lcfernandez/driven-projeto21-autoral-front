import { AddCircle } from "grommet-icons";
import { GREY_COLOR } from "../../constants/color";
import { HeaderApp } from "../../components/HeaderApp";
import styled from "styled-components";

export function ProjectsPage() {
  return (
    <>
      <HeaderApp />

      <ProjectsPageContainer>
        <Title>
          <h1>Seus projetos</h1> <AddCircleButton color={GREY_COLOR} />
        </Title>

        <h3>
          Você ainda não tem projetos criados
        </h3>
      </ProjectsPageContainer>
    </>
  );
}

const AddCircleButton = styled(AddCircle)`
  cursor: pointer;  
  margin: auto 1rem auto;
`;

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  padding: 1rem;
`;

const Title = styled.div`
  display: flex;
`;
