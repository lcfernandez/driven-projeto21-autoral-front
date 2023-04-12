import { AddCircle, Edit, Trash } from "grommet-icons";
import { GREY_COLOR } from "../../constants/color";
import { HeaderApp } from "../../components/HeaderApp";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export function ProjectsPage() {
  const [token] = useContext(UserContext);

  const [projects, setProjects] = useState(undefined);
  const [updateProjects, setUpdateProjects] = useState(false);

  const navigate = useNavigate();

  function createProject(id) {
    const name = prompt("Qual será o nome do projeto?");

    if (name) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };
      const body = { name };

      axios
        .post(`${process.env.REACT_APP_API_URI}/projects`, body, header)
        .then(
          () => {
            alert("Projeto criado com sucesso!")
            setUpdateProjects(!updateProjects);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function deleteProject(id, name) {
    if (window.confirm(`Deseja mesmo excluir o projeto ${name}?`)) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };

      axios
        .delete(`${process.env.REACT_APP_API_URI}/projects/${id}`, header)
        .then(
          () => {
            alert("Projeto excluído com sucesso!")
            setUpdateProjects(!updateProjects);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function editProject(id, name) {
    const newName = prompt("Qual será o novo nome do projeto?", name);
    
    if (newName && newName !== name) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };
      const body = { name: newName };

      axios
        .put(`${process.env.REACT_APP_API_URI}/projects/${id}`, body, header)
        .then(
          () => {
            alert("Projeto renomeado com sucesso!")
            setUpdateProjects(!updateProjects);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function handleProjects() {
    if (projects.length === 0) {
      return <h3>Você ainda não tem projetos criados</h3>;
    }

    return (
      projects.map(
        project => <li key={project.id}>
          <h2>- <Link to={`/projects/${project.id}`}>{project.name}</Link></h2>
          <Actions>
            <Edit
              //disabled={disabled && true}
              onClick={() => editProject(project.id, project.name)}
              size="18px"
            />
            <Trash
              //disabled={disabled && true}
              onClick={() => deleteProject(project.id, project.name)}
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
  }, [navigate, token, updateProjects]);

  return (
    <>
      <HeaderApp />

      <ProjectsPageContainer>
        <Title>
          <h1>Seus projetos</h1>
          <AddCircleButton
            color={GREY_COLOR}
            //disabled={disabled && true}
            onClick={createProject}
          />
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

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 600px) {
      text-align: center;
    }
  }
`;

const Title = styled.div`
  display: flex;
`;
