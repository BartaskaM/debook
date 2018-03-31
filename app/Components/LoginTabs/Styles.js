const Styles = theme => ({
  root: {
    padding: 20,
    margin: 20,
  },
  signUpFormField: {
    marginTop: 25,
  },
  fontSize: {
    fontSize: theme.typography.pxToRem(20),
  },
  menuItemWidth: {
    fontSize: 14,
    width: 420,
  },
  signUpButton: {
    height: 50,
    fontSize: 14,
  },
  errorMessage: {
    color: 'red',
  },
});

export default Styles;