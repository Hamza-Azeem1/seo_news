import { Component } from "react";
import PropTypes from "prop-types";
import Page from "../page/page";
import ErrorPage from './components/ErrorPage';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error(error);
        console.error(info);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.hasError !== this.state.hasError && this.state.hasError) {
            document.title = "Error 404";
        }
    }

    render() {
        const { hasError } = this.state;
        const { title, children } = this.props;

        return (
            <Page title={hasError ? "Error 404" : title}>
                {hasError ? <ErrorPage /> : children}
            </Page>
        );
    }
}

ErrorBoundary.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired
};

ErrorBoundary.defaultProps = {
    title: "Default Title"
};

export default ErrorBoundary;
