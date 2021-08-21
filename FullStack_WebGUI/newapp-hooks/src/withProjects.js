import React from "react";
import { fetchRepos } from "./api.js";

export default function withProjects(Component) {
  return class WithRepos extends React.Component {
    state = {
      repos: [],
      loading: true
    };

    componentDidMount() {
      this.updateRepos(this.props.id);
    }

    componentDidUpdate(prevProps) {
      if (prevProps.id !== this.props.id) {
        this.updateRepos(this.props.id);
      }
    }

    updateRepos = id => {
      this.setState({ loading: true });

      fetchRepos(id).then(repos =>
        this.setState({
          repos,
          loading: false
        })
      );
    };

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  };
}
