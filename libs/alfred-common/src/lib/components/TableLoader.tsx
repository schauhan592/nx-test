import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function TableLoader(length: number, cols: number) {
  const loader = Array.from({ length: length }, (_, index) => index + 1).map((_) => {
    return (
      <TableRow key={_}>
        {Array.from({ length: cols }, (_, columnIndex) => (
          <TableCell key={columnIndex}>
            <Skeleton height={30} />
          </TableCell>
        ))}
      </TableRow>
    );
  });
  return loader;
}
