import Table from '@/components/table';
import TableBody from '@/components/tableBody';
import TableBodyCell from '@/components/tableBodyCell';
import TableContainer from '@/components/tableContainer';
import TableHeader from '@/components/tableHeader';
import TableHeaderCell from '@/components/tableHeaderCell';
import TableRow from '@/components/tableRow';

const UserAuthorizationPage = () => {
  return (
    <TableContainer>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>테이블 헤더1</TableHeaderCell>
            <TableHeaderCell>테이블 헤더2</TableHeaderCell>
            <TableHeaderCell>테이블 헤더3</TableHeaderCell>
            <TableHeaderCell>테이블 헤더4</TableHeaderCell>
            <TableHeaderCell>테이블 헤더5</TableHeaderCell>
            <TableHeaderCell>테이블 헤더6</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableBodyCell>값1</TableBodyCell>
            <TableBodyCell>값2</TableBodyCell>
            <TableBodyCell>값3</TableBodyCell>
            <TableBodyCell>값4</TableBodyCell>
            <TableBodyCell>값5</TableBodyCell>
            <TableBodyCell>값6</TableBodyCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserAuthorizationPage;
