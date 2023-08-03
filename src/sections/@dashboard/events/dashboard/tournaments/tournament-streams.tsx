import { useCallback, useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
// routes
// components
import Iconify from '../../../../../components/iconify';
import Scrollbar from '../../../../../components/scrollbar';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TablePaginationCustom,
  TableHeadCustom,
} from '../../../../../components/table';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import TournamentStreamsTableToolbar from './tournament-streams/TournamentStreamsTableToolbar';
import { ITournamentStreams } from 'src/@types/tournaments';
import TournamentStreamsTableRow from './tournament-streams/TournamentStreamsTableRow';
import TournamentStreamsNewEditForm from './tournament-streams/TounamentStreamsNewEditForm';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', align: 'left' },
  { id: 'url', label: 'URL', align: 'left' },
  { id: '' },
];

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function TournamentStreamsListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const {
    query: { tournamentSlug },
  } = useRouter();

  const [tableData, setTableData] = useState<ITournamentStreams[]>([]);

  const [filterName, setFilterName] = useState('');

  const getFAQList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-tournament-stream/', {
        params: { slug: tournamentSlug },
      });
      setTableData(response.data.tournament_streams);
    } catch (error) {
      console.error(error);
    }
  }, [tournamentSlug]);

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getFAQList();
    setOpen(false);
    setOpenEdit(false);
  }, [getFAQList, refetch]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '';

  const isNotFound = (!dataFiltered.length && !!filterName) || !dataFiltered.length;

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteRow = (id: string) => {
    axiosInstance2
      .delete(`/delete-tournament-stream/`, {
        params: { id },
      })
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Deleted', { variant: 'success' });
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Deleting', { variant: 'error' });
      });
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const [currentStream, setCurrentFaqs] = useState<ITournamentStreams | undefined>(undefined);

  const handleEditRow = (row: ITournamentStreams) => {
    setCurrentFaqs(row);
    handleClickOpenEdit();
  };

  return (
    <>
      <Container maxWidth={false}>
        <Button
          onClick={handleClickOpen}
          sx={{ mb: 2 }}
          variant="contained"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Streams
        </Button>

        <Card>
          <TournamentStreamsTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} onSort={onSort} />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TournamentStreamsTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                        onEditRow={() => handleEditRow(row)}
                      />
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Add Stream</DialogTitle>
        <DialogContent>
          <TournamentStreamsNewEditForm
            setRefetch={setRefetch}
            refetch={refetch}
            tournamentSlug={tournamentSlug as string}
          />
        </DialogContent>
      </Dialog>
      <Dialog fullWidth open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Faq</DialogTitle>
        <DialogContent>
          <TournamentStreamsNewEditForm
            setRefetch={setRefetch}
            refetch={refetch}
            tournamentSlug={tournamentSlug as string}
            isEdit
            currentStream={currentStream}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: ITournamentStreams[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (stream) => stream.stream_title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
