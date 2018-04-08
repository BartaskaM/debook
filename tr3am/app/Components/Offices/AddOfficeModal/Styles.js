const Styles = theme => ({
  modalWidth: {
    fullWidth: true,
    maxWidth: 'none',
  },
  fontSize: {
    fontSize: theme.typography.pxToRem(20),
  },
  title: {
    fontSize: 30,
  },
  button: {
    height: 50,
    fontSize: 14,
  },
  errorMessage: {
    color: 'red',
    paddingLeft: 25,
  },
});

export default Styles;