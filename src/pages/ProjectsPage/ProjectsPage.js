import { AddCircle } from "grommet-icons";
import { GREY_COLOR } from "../../constants/color";
import { HeaderApp } from "../../components/HeaderApp";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from "../../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

export function ProjectsPage() {
  const [projects, setProjects] = useState(undefined);
  const [token] = useContext(UserContext);

  const navigate = useNavigate();

  function handleProjects() {
    if (projects.length === 0) {
      return <h3>Você ainda não tem projetos criados</h3>;
    }

    return projects.map(projects => <li key={projects.id}><h2>- {projects.name}</h2></li>);
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

const AddCircleButton = styled(AddCircle)`
  cursor: pointer;  
  margin: auto 1rem auto;
`;

const ProjectsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  padding: 1rem;

  ul {
    margin: 2rem 0;

    @media (max-width: 600px) {
      text-align: center;
    }
  }

  li {
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
`;
