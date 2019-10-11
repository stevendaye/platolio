import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { doGetGithubReposWithErrorCheck } from "../../thunks/profile";

const ProfileGithub = ({ username, onGetGithubRepos, repos }) => {
  useEffect(() => {
    onGetGithubRepos(username);
  }, [onGetGithubRepos, username]);

  return (
    <div className = "profile-github">
      {repos === null
        ? <Spinner />
        : (
          <div>
            <h2 className = "text-primary">Github Repositories</h2>
            {repos.map(repo => (
              <div  style = {{border: "#ccc solid 1px", marginBottom: "10px", borderRadius: "4px"}}>
                <div key = {repo.id} className = "repo bg-white p-1 my-1" style = {{border: "none"}}>
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
                </div>
                <div style = {{fontFamily: "Arial"}}>
                  <ul className = "repo-info">
                    <li className = "stars">
                      stars: {repo.stargazers_count}
                    </li>
                    <li className = "watchers">
                      watchers: {repo.watchers_count}
                    </li>
                    <li className = "forks">
                      forks: {repo.forks_count}
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
