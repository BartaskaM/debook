const Styles = theme => ({
  root: {
    position: 'static',
  },
  drawerPaper: {
    width: '20%',
    padding: 10,
  },
  toolbar: theme.mixins.toolbar,
  button: {
    margin: 5,
  },
  itemText: {
    fontSize: theme.typography.pxToRem(22),
    paddingBottom: 6,
  },
  itemPadding: {
    padding: '0px 10px',
  },
  groupName: {
    fontSize: theme.typography.pxToRem(22),
    paddingTop: 10,
  },
  textSize: {
    fontSize: theme.typography.pxToRem(22),
  },
});
  
export default Styles;