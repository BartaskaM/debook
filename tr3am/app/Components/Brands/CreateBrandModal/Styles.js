const Styles = theme => ({
  modalWidth: {
    fullWidth: true,
    maxWidth: 'none',
  },
  dialogBox: {
    padding: 25,
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
  },
  description: {
    fontSize: 16,
  },
  formField: {
    marginTop: 10,
  },
  createOfficeLoadingBar: {
    marginTop: 20,
  },
});

export default Styles;