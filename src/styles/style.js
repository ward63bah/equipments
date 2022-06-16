import { makeStyles } from '@mui/styles';

const FONT_SIZE_HEAD = 20;
const FONT_SIZE_CONTENT = 15;
const FONT_SIZE_BUTTON = 15;
const FONT_SIZE_ICON = 15;

export const drawerWidth = 240;
export const style = makeStyles((theme) => ({
  mainBackground: {
    backgroundColor: '#121c26',
    borderRadius: 10,
    padding: 10,
    minHeight: '65vh',
  },
  subBackground: {
    backgroundColor: '#121c26',
    borderRadius: 10,
  },
  componentBackground: {
    backgroundColor: '#121c26',
    borderRadius: 10,
  },
  content: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'block',
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(9) + 1,
    },
  },
  contentOffset: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: 'block',
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
  },
  button: {
    '&.MuiButton-root': {
      borderRadius: 4,
      fontSize: FONT_SIZE_BUTTON,
      height: 25,
      minWidth: '6vw',
    },
  },
  textField: {
    color: '#ffffff',
    height: 30,
    borderColor: '#51b4ec',
    '&.MuiFormControl-root ': {
      // minWidth: "-webkit-fill-available",
      borderColor: '#51b4ec',
    },
    '&.MuiOutlinedInput-root': {
      color: '#ffffff',
      backgroundColor: '#242f39',
      fontSize: FONT_SIZE_CONTENT,
      paddingLeft: 20,
      minWidth: '5vw',
      borderColor: '#51b4ec',
      borderRadius: 10,
      '& fieldset': {
        borderColor: '#51b4ec',
        color: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#ffffff',
        color: '#ffffff',
      },
      '&:disabled': {
        backgroundColor: '#454c54',
        color: '#ffffff',
      },
      '&.Mui-disabled': {
        borderColor: '#51b4ec',
        color: '#ffffff',
      },
    },
    '&.Mui-focused fieldset': {
      borderColor: '#51b4ec',
      color: '#ffffff',
    },
    '&.Mui-disabled fieldset': {
      borderColor: '#51b4ec',
      color: '#ffffff',
    },
  },
  selector: {
    '&.MuiOutlinedInput-root': {
      display: 'flex',
      // flexWrap: "wrap",
      height: 30,
      color: '#ffffff',
      backgroundColor: '#242f39',
      fontSize: FONT_SIZE_CONTENT,
      paddingLeft: 20,
      minWidth: '6vw',
      borderColor: '#51b4ec',
      borderRadius: 10,
      '&:before': {
        borderColor: '#51b4ec',
      },
      '&:after': {
        borderColor: '#51b4ec',
      },
    },
    '&.MuiInputBase-root': {
      borderColor: '#51b4ec',
    },
    '&.MuiSvgIcon-root': {
      fill: '#ffffff',
      fontSize: FONT_SIZE_ICON,
      paddingRight: 5,
    },
  },
  selectorIcon: {
    fill: '#ffffff',
    fontSize: FONT_SIZE_ICON,
    paddingRight: 5,
  },
  menuItem: {
    '&.MuiMenuItem-root': {
      backgroundColor: '#242f39',
      color: '#ffffff',
      paddingRight: 10,
      '&:hover': {
        backgroundColor: '#454c54',
        color: '#ffffff',
      },
      '&.Mui-selected': {
        backgroundColor: '#51b4ec',
        color: '#ffffff',
        '&:hover': {
          backgroundColor: '#454c54',
          color: '#ffffff',
        },
      },
    },
    '&.MuiList-padding ': {
      paddingTop: 0,
      paddingBottom: 0,
      borderRadius: 5,
    },
  },
  tableContainer: {
    '&.MuiTableContainer-root': {
      overflowY: 'auto',
      overflowX: 'auto',
      maxHeight: '50vh',
      minWidth: '20vw',
      // backgroundColor: '#242f39',
      borderRadius: 10,
    },
  },
  tableHead: {
    '&.MuiTableCell-root': {
      borderBottomColor: '#242f39',
      backgroundColor: '#242f39',
      fontSize: FONT_SIZE_BUTTON,
      color: '#51b4ec',
    },
  },
  tableBody: {
    '&.MuiTableBody-root': {
      fontSize: FONT_SIZE_CONTENT,
    },
  },
  tableCell: {
    '&.MuiTableCell-root': {
      borderBottomColor: '#242f39',
      backgroundColor: '#242f39',
      color: '#ffffff',
      fontSize: FONT_SIZE_CONTENT,
      minWidth: '1vw',
    },
    '&.MuiFormControlLabel-root': {
      color: '#ffffff',
      fontSize: FONT_SIZE_CONTENT,
      minWidth: '1vw',
    },
    '&.MuiFormControlLabel-label': {
      color: '#ffffff',
      fontSize: FONT_SIZE_CONTENT,
      minWidth: '1vw',
    },
  },
  datePicker: {
    '& .MuiInputBase-input': {
      color: 'white',
      fontSize: FONT_SIZE_CONTENT,
      padding: '6px 10px',
    },
    '&.MuiFormControl-root ': {
      minWidth: '-webkit-fill-available',
      borderColor: '#51b4ec',
    },
    '&.MuiTextField-root': {
      color: 'white',
      fontSize: FONT_SIZE_CONTENT,
      borderColor: '#51b4ec',
      '& fieldset': {
        borderColor: '#51b4ec',
      },
      '&:hover fieldset': {
        borderColor: '#51b4ec',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#51b4ec',
      },
      '&.Mui-disabled fieldset': {
        borderColor: '#51b4ec',
      },
    },
    '&.MuiInputLabel-root ': {
      color: '#51b4ec',
    },
    '& label.Mui-focused': {
      color: '#51b4ec',
    },
  },
  dialog: {
    backgroundColor: '#242f39',
    color: '#ffffff',
  },
  dialog: {
    '&.MuiDialog-root': {
      background: '#121c26',
      width: '100%',
    },
    '&.MuiDialogTitle-root': {
      background: '#121c26',
      width: '100%',
    },
    '&.MuiDialogActions-root': {
      background: '#121c26',
      width: '100%',
    },
    '&.MuiDialogContent-root': {
      background: '#121c26',
      width: '100%',
    },
    '&.MuiDialogContentText-root': {
      color: '#ffffff',
    },
  },
  table: {
    '&.MuiTable-root': {
      backgroundColor: '#121c26',
    },
    '&.MuiTable-stickyHeader': {
      backgroundColor: '#121c26',
    },
    '&.MuiTableBody-root': {
      backgroundColor: '#121c26',
    },
    '&.MuiTableRow-root': {
      backgroundColor: '#121c26',
    },
    '&.MuiTableCell-root': {
      backgroundColor: '#121c26',
    },
  },
  tableContainer: {
    '&.MuiTableContainer-root': {
      overflowY: 'auto',
      overflowX: 'auto',
      borderRadius: 4,
      border: '1px solid gray',
      minHeight: '50vh',
      minWidth: '100%',
    },
  },
  accordion: {
    '&.MuiAccordion-root': {
      backgroundColor: '#454c54',
      color: '#ffffff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      '&.MuiPaper-root': {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
    },
    '&.MuiAccordion-rounded': {
      // borderRadius: 4,
    },
  },
  accordionSummary: {
    '&.MuiAccordionSummary-root': {
      backgroundColor: '#121c26',
      color: '#ffffff',
      // borderRadius: 4,
      // border: "1px solid white",
    },
  },
  accordionSummaryExpanded: {
    '&.MuiAccordionSummary-root': {
      backgroundColor: '#121c26',
      color: '#51b4ec',
    },
  },
  accordionDetail: {
    '&.MuiAccordionDetails-root': {
      backgroundColor: '#121c26',
      color: '#ffffff',
      borderRadius: 4,
      border: '1px solid white',
    },
  },
  accordionIcon: {
    color: '#51b4ec',
    fontSize: FONT_SIZE_ICON,
  },
  accordionIconExpanded: {
    color: '#51b4ec',
    fontSize: FONT_SIZE_ICON,
  },
}));
