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
  select: {
    fontSize: theme.typography.pxToRem(20),
    width: '100%',
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
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    right: 20,
    marginTop: -12,
    marginLeft: -12,
  },
  progressBar: {
    marginBottom: 12,
  },
});
  
export default Styles;