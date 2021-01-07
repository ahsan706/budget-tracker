import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);
export default StyledTableRow;
