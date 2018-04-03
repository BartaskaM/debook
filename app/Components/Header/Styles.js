const Styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: theme.zIndex.drawer + 1,
  },
  appBar: {
    backgroundColor: 'white',
  },
  menuButton: {
    fontSize: 32,
  },
  leftMargin: {
    marginLeft: 50,
    display: 'inline',
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
    display: 'inline-block',
    position: 'absolute',
  },
  formControl: {
    minWidth: 100,
  },
  input: {
    minWidth: 200,
    marginRight: 20,
    fontSize: 14,
  },
  fontSize: {
    fontSize: 14,
  },
  button: {
    fontSize: 10,
    margin: 10,
  },
  rightMenu: {
    position: 'absolute',
    right: 10,
  },
  homeButton: {
    cursor: 'pointer',
  },
});

export default Styles;