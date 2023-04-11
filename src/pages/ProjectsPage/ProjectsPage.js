import { AddCircle, Edit, Trash } from "grommet-icons";
import { GREY_COLOR } from "../../constants/color";
import { HeaderApp } from "../../components/HeaderApp";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export function ProjectsPage() {
  const [token] = useContext(UserContext);

  const [disabled, setDisabled] = useState(false);
  const [projects, setProjects] = useState(undefined);

  const navigate = useNavigate();

  function deleteProject(id) {
    confirm("Deseja mesmo excluir o projeto");
  }

  function handleProjects() {
    if (projects.length === 0) {
      return <h3>Você ainda não tem projetos criados</h3>;
    }

    return (
      projects.map(
        project => <li key={project.id}>
          <h2>- {project.name}</h2>
          <Actions>
            <Edit
              disabled={disabled && true}
              size="18px"
            />
            <Trash
              disabled={disabled && true}
              onClick={() => deleteProject(project)}
              size="18px"
            />
          </Actions>
        </li>
      )
    );
  }

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const header = { headers: { "Authorization": `Bearer ${token}` } };

      axios
        .get(`${process.env.REACT_APP_API_URI}/projects`, header)
        .then(
          res => {
            setProjects(res.data);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }, [navigate, token]);

  return (
    <>
      <HeaderApp />

      <ProjectsPageContainer>
        <Title>
          <h1>Seus projetos</h1> <AddCircleButton color={GREY_COLOR} />
        </Title>

        <ul>
          {
            projects ? handleProjects() :
              <ThreeDots
                ariaLabel="three-dots-loading"
                color={GREY_COLOR}
                height={50}
                width={50}
              />
          }
        </ul>
      </ProjectsPageContainer>
    </>
  );
}

const Actions = styled.div`
  align-items: center;
  display: flex;

  * {
    cursor: pointer;
    margin-left: 1rem;
  }
`;

const AddCircleButton = styled(AddCircle)`
  cursor: pointer;  
  margin: auto 1rem auto;
`;

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  padding: 1rem;

  li {
    display: flex;
    margin-bottom: 1rem;
  }

  ul {
    margin: 2rem 0;

    @media (max-width: 600px) {
      text-align: center;
    }
  }
`;

const Title = styled.div`
  display: flex;
`;
