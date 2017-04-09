/**
 * Provides a simple wrapper around the react api to make using react components easy regardless
 * of the environment.
 * 
 * @param componentName function Component that you want to use.
 * 
 * @param stateData     object   State data that you want to pass to your component. 
 * 
 * @returns object
 *
 * Example: 
 * // Render component and add to DOM.
 * var avatar = createComponent(Avatar, {user: data}, document.getElementById('123'));
 * // To update the component we can then call setState
 * avatar.setState({user: newData});
 */
function createComponent(componentName, stateData, mountId) {

  // "Global" access point to make accesible to our private
  // class that allows us to expose the React API from outside
  // of the standard React env.
  var compApi = {};

  // Private Class to create base-state
  class _Base extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data: this.props.data
        }
      }

      componentWillMount() {
        compApi.setState = (data) => {
          this.setState({data: data});
        };
      }

      render() {
        return React.createElement(this.props.comp, this.state);
      }
  }

  // Render Component and add it to DOM
  ReactDOM.render(
    React.createElement(
      _Base,
      { comp: componentName, data: stateData}
      ),
      mountId
    );

  // Return access to lifecycle hooks
  return compApi;
}