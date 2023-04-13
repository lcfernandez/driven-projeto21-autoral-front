import { UserContext } from "../../contexts/UserContext";
import { HeaderApp } from "../../components/HeaderApp";
import { GREY_COLOR, WHITE_COLOR } from "../../constants/color";
import { AddCircleButton, Title } from "../ProjectsPage/ProjectsPage";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash } from "grommet-icons";
import styled from "styled-components";
import axios from "axios";

export function ProjectPage() {
  const [token] = useContext(UserContext);

  const [images, setImages] = useState(undefined);
  const [moodboardId, setMoodboardId] = useState(undefined);
  const [updateImages, setUpdateImages] = useState(false);

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
  
  function handleImages() {
    if (images.length === 0) {
      return <h3>Você ainda não tem imagens carregadas</h3>;
    }

    return (
      images.map(
        image => <li key={image.id}>
          <ImgContainer>
            <ImgStyled alt={`Imagem ${image.id}`} src={image.url} />
            <TrashAction
              //disabled={disabled && true}
              onClick={() => deleteImage(image.id)}
              size="18px"
            />
          </ImgContainer>
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

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      const header = { headers: { "Authorization": `Bearer ${token}` } };

      axios
        .get(`${process.env.REACT_APP_API_URI}/projects/${id}/moodboard`, header)
        .then(
          res => {
            setImages(res.data.images);
            setMoodboardId(res.data.moodboard_id);
          }
        )
        .catch(
          err => {
            alert(err.response.data.message || err.response.data);
          }
        );
    }
  }, [navigate, token, updateImages, id]);

  return (
    <>
      <HeaderApp />

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
      </ProjectPageContainer>
    </>
  );
}

const ImgContainer = styled.div`
  position: relative;
`;

const ImgStyled = styled.img`
  height: 15rem;
  max-width: 20.6rem;
`;

const MoodboardContainer = styled.div`
`;

const ProjectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5rem);
  padding: 1rem;

  li {
    display: flex;
    margin-bottom: 1rem;
  }

  ul {
    display: flex;
    margin: 2rem 0;

    a {
      color: inherit;
      text-decoration: none;
    }

    @media (max-width: 600px) {
      display: block;
      text-align: center;
    }
  }
`;

const TrashAction = styled(Trash)`
  background-color: ${WHITE_COLOR};
  cursor: pointer;
  margin: 0.2rem;
  padding: 0.055rem;
  position: absolute;
  right: 0;
`;
