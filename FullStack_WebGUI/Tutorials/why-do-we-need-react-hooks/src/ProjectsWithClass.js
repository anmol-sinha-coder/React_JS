import React from "react";
import { fetchRepos } from "./api.js";
import Loading from "./Loading";
import useProjects from "./useProjects.js";

const ProjectsWithClass = ({ id }) => {
  const [loading, repos] = useProjects(id);

  if (loading === true) {
    return <Loading />;
  }

  return (
    <ul>
      {repos.map(({ name, handle, stars, url }) => (
        <li key={name}>
          <ul>
            <li>
              <a href={url}>{name}</a>
            </li>
            <li>@{handle}</li>
            <li>{stars} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default ProjectsWithClass;
