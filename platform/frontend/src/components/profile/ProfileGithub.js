import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { doGetGithubReposWithErrorCheck } from "../../thunks/profile";

const ProfileGithub = ({ username, onGetGithubRepos, repos }) => {
  useEffect(() => {
    onGetGithubRepos(username);
  }, [onGetGithubRepos], username);

  return (
    <div className = "profile-github">
      {repos === null
        ? <Spinner />
        : (
          <div>
            <h2 className = "text-primary">Repositories</h2>
            {repos.map(repo => (
              <div key = {repo.id} className = "repo bg-white p-1 my-1">
                <div>
                  <h4>
                    <a
                      className = ""
                      href = {repo.html_url}
                      target = "_blank"
                      rel = "noopener noreferrer"
                    >
                      {repo.name}
                    </a>
                  </h4>
                  <p>{repo.description}</p>
                </div>
                <div>
                  <ul>
                    <li className = "badge badge-primary">
                      Stars: {repo.stargazers_count}
                    </li>
                    <li className = "badge badge-dark">
                      Watchers: {repo.watchers_count}
                    </li>
                    <li className = "badge badge-primary">
                      Forks: {repo.forks_count}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
};

ProfileGithub.propTypes = {
  onGetGithubRepos: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  repos: PropTypes.array
};

const mapStateToPropsProfileGithub = state => ({
  repos: state.profileState.repos
});

const mapDispatchToPropsProfileGithub = dispatch => ({
  onGetGithubRepos: username => dispatch(doGetGithubReposWithErrorCheck(username))
});

const ConnectedProfileGithub = connect(mapStateToPropsProfileGithub, mapDispatchToPropsProfileGithub)(ProfileGithub);

export default ConnectedProfileGithub;
