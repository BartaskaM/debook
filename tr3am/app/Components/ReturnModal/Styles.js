const Styles = theme=>({
  inputField: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    width: '30%',
  },
  title: {
    fontSize: 30,
  },
  description: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
  },
  helperText: {
    fontSize: 10,
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '25%',
    right: -20,
  },
  loader: {
    marginTop: 20,
  },
  errorMessage: {
    color: 'red',
  },
});
  
export default Styles;