import { UserContext } from "../../contexts/UserContext";
import { HeaderApp } from "../../components/HeaderApp";
import { GREY_COLOR, OFF_WHITE_COLOR, SILVER_COLOR, WHITE_COLOR } from "../../constants/color";
import { TEXT_FONT } from "../../constants/fonts";
import { AddCircleButton, Title } from "../ProjectsPage/ProjectsPage";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormEdit, FormClose, FormAdd } from "grommet-icons";
import styled from "styled-components";
import axios from "axios";

export function ProjectPage() {
  const [token] = useContext(UserContext);

  const [images, setImages] = useState(undefined);
  const [lanes, setLanes] = useState(undefined);
  const [moodboardId, setMoodboardId] = useState(undefined);
  const [projectName, setProjectName] = useState("");
  const [updateImages, setUpdateImages] = useState(false);
  const [updateLanes, setUpdateLanes] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  function deleteImage(id) {
    if (window.confirm("Deseja mesmo excluir essa imagem?")) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };

      axios
        .delete(`${process.env.REACT_APP_API_URI}/images/${id}`, header)
        .then(
          () => {
            alert("Imagem excluída com sucesso!")
            setUpdateImages(!updateImages);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function deleteLane(id, title) {
    if (window.confirm(`Deseja mesmo excluir a lista ${title}?`)) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };

      axios
        .delete(`${process.env.REACT_APP_API_URI}/lanes/${id}`, header)
        .then(
          () => {
            alert("Lista excluída com sucesso!")
            setUpdateLanes(!updateLanes);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function editLane(laneId, title) {
    const newTitle = prompt("Qual será o novo título da lista?", title);
    
    if (newTitle && newTitle !== title) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };
      const body = { title: newTitle, project_id: Number(id) };

      axios
        .put(`${process.env.REACT_APP_API_URI}/lanes/${laneId}`, body, header)
        .then(
          () => {
            alert("Lista renomeada com sucesso!")
            setUpdateLanes(!updateLanes);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }
  
  function handleImages() {
    if (images.length === 0) {
      return <h3>Você ainda não tem imagens carregadas</h3>;
    }

    return (
      images.map(
        image => <li key={image.id}>
          <ImgContainer>
            <ImgStyled alt={`Imagem ${image.id}`} src={image.url} />
            <FormCloseAction
              //disabled={disabled && true}
              onClick={() => deleteImage(image.id)}
              size="18px"
            />
          </ImgContainer>
        </li>
      )
    );
  }

  function handleLanes() {
    if (lanes.length === 0) {
      return <h3>Você ainda não tem listas criadas</h3>;
    }

    return (
      lanes.map(
        lane => <li key={lane.id}>
          <Lane>
            <TitleLane>
              {lane.title}
            </TitleLane>
            
            <span>
              <FormAdd
                //disabled={disabled && true}
                //onClick={() => editLane(lane.id, lane.title)}
                size="22px"
              />
              <FormEdit
                //disabled={disabled && true}
                onClick={() => editLane(lane.id, lane.title)}
                size="22px"
              />
              <FormClose
                //disabled={disabled && true}
                onClick={() => deleteLane(lane.id, lane.title)}
                size="22px"
              />
            </span>
          </Lane>
        </li>
      )
    );
  }

  function insertImage() {
    const url = prompt("Qual é a URL da imagem?");

    if (url) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };
      const body = { url, moodboard_id: moodboardId };

      axios
        .post(`${process.env.REACT_APP_API_URI}/images`, body, header)
        .then(
          () => {
            alert("Imagem carregada com sucesso!")
            setUpdateImages(!updateImages);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function insertLane() {
    const title = prompt("Qual será o nome da lista?");

    if (title) {
      const header = { headers: { "Authorization": `Bearer ${token}` } };
      const body = { title, project_id: Number(id) };

      axios
        .post(`${process.env.REACT_APP_API_URI}/lanes`, body, header)
        .then(
          () => {
            alert("Lista criada com sucesso!")
            setUpdateLanes(!updateLanes);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }

  function reLoadImages() {
    const header = { headers: { "Authorization": `Bearer ${token}` } };

    axios
      .get(`${process.env.REACT_APP_API_URI}/projects/${id}/moodboard`, header)
      .then(
        res => {
          setImages(res.data.images);
          setProjectName(res.data.project_name);
          setMoodboardId(res.data.moodboard_id);
        }
      )
      .catch(
        err => {
          alert(err.response.data.message || err.response.data);
        }
      );
  };

  function reLoadLanes() {
    const header = { headers: { "Authorization": `Bearer ${token}` } };

    axios
      .get(`${process.env.REACT_APP_API_URI}/projects/${id}/lanes`, header)
      .then(
        res => {
          setLanes(res.data);
        }
      )
      .catch(
        err => {
          alert(err.response.data.message || err.response.data);
        }
      );
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      reLoadImages();
    }
  }, [updateImages]);

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      reLoadLanes();
    }
  }, [updateLanes]);

  return (
    <>
      <HeaderApp />

      <TitleProject>
          {projectName}
      </TitleProject>

      <ProjectPageContainer>
        <MoodboardContainer>
          <Title>
            <h1>Moodboard</h1>
            <AddCircleButton
              color={GREY_COLOR}
              //disabled={disabled && true}
              onClick={insertImage}
            />
          </Title>

          <ul>
            {
              images ? handleImages() :
                <ThreeDots
                  ariaLabel="three-dots-loading"
                  color={GREY_COLOR}
                  height={50}
                  width={50}
                />
            }
          </ul>
        </MoodboardContainer>

        <LanesContainer>
          <Title>
            <h1>Listas</h1>
            <AddCircleButton
              color={GREY_COLOR}
              //disabled={disabled && true}
              onClick={insertLane}
            />
          </Title>

          <ul>
            {
              lanes ? handleLanes() :
                <ThreeDots
                  ariaLabel="three-dots-loading"
                  color={GREY_COLOR}
                  height={50}
                  width={50}
                />
            }
          </ul>
        </LanesContainer>
      </ProjectPageContainer>
    </>
  );
}

const FormCloseAction = styled(FormClose)`
  background-color: ${OFF_WHITE_COLOR};
  cursor: pointer;
  position: absolute;
  right: 0;
`;

const ImgContainer = styled.div`
  position: relative;
`;

const ImgStyled = styled.img`
  height: auto;
  max-height: 15rem;
  max-width: calc(50vw - 1.25rem);
  width: auto;
`;

const LanesContainer = styled.div`
  height: calc(100vh - 8.5rem);
  overflow: scroll;
  width: calc(50vw - 1rem);

  ul {
    display: flex;
    margin-top: 2rem;
  }

  @media (max-width: 600px) {
    width: calc(100vw - 2rem);
  }
`;

const Lane = styled.div`
  background-color: ${SILVER_COLOR};
  border-radius: 0.5rem;
  display: flex;
  height: 30rem;
  justify-content: space-between;
  margin-right: 0.5rem;
  width: 20rem;

  span {
    * {
      cursor: pointer;
      margin: 0.25rem;
    }
  }
`;

const MoodboardContainer = styled.div`
  overflow: scroll;
  width: calc(50vw - 1rem);

  li {
    background-color: ${OFF_WHITE_COLOR};
    display: flex;
    margin-bottom: 0.5rem;
    padding: 0.1rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    margin: 2rem 0;

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 600px) {
      justify-content: center;
      text-align: center;
    }
  }

  @media (max-width: 600px) {
    width: calc(100vw - 2rem);
  }
`;

const ProjectPageContainer = styled.div`
  display: flex;
  height: calc(100vh - 7.5rem);
  padding: 1rem;

  @media (max-width: 600px) {
    display: block;
  }
`;

const TitleLane = styled.div`
  color: ${GREY_COLOR};
  font-family: ${TEXT_FONT};
  font-size: 1rem;
  padding: 0.5rem;;
`;

const TitleProject = styled.div`
  background-color: ${SILVER_COLOR};
  color: ${WHITE_COLOR};
  font-family: ${TEXT_FONT};
  font-size: 1.5rem;
  padding: 0.5rem 1rem;;

  @media (max-width: 600px) {
    font-size: 1rem;
    text-align: center;
  }
`;
