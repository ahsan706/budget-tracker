import { styled } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  '&.MuiTableCell-body': {
    fontSize: 14
  }
}));

export default StyledTableCell;
