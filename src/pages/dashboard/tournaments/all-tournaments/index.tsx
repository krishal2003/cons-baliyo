import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Card, Table, Button, TableBody, Container, TableContainer } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
// layouts
import DashboardLayout from '../../../../layouts/dashboard';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../../components/table';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { useSnackbar } from 'notistack';
import { Tournament } from 'src/@types/tournaments';
import AllTournamentsTableRow from 'src/sections/@dashboard/events/dashboard/tournaments/all-tournaments/AllTournamentsTableRow';
import { AllTournamentsTableToolbar } from 'src/sections/@dashboard/events/dashboard/tournaments/all-tournaments';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tournament Name', align: 'left' },
  { id: 'username', label: 'Organizer', align: 'left' },
  { id: 'is_verified', label: 'Verified', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

TournamentsListPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function TournamentsListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { themeStretch } = useSettingsContext();

  const [loadingUsers, setLoadingUsers] = useState(true);

  const [tableData, setTableData] = useState<Tournament[]>([]);

  const [filterName, setFilterName] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const [refetch, setRefetch] = useState(false);

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/all-tournaments', {
        params: { all: '1' },
      });
      setTableData(response.data.tournaments);
      setLoadingUsers(false);
    } catch (error) {
      console.error(error);
      setLoadingUsers(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers, refetch]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '';

  const isNotFound = !dataFiltered.length && !!filterName;

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id: string) => {
    const deleteRow = tableData.filter((row) => `${row.id}` !== id);
    setSelected([]);
    setTableData(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleEditRow = (slug: string) => {
    axiosInstance2
      .post(`/verify-tournament/?slug=${slug}`)
      .then((res) => {
        enqueueSnackbar('Done', { variant: 'success' });
        setRefetch(!refetch);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Verifying', { variant: 'error' });
      });
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <>
      <Head>
        <title> Tournament: List | ESAN</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="All Events List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Tournament', href: PATH_DASHBOARD.user.root },
            { name: 'List' },
          ]}
        />

        <Card>
          <AllTournamentsTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <AllTournamentsTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(`${row.id}`)}
                        onEditRow={() => handleEditRow(`${row.slug}`)}
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
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
}: {
  inputData: Tournament[];
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
      (event) => `${event.tournament_name}`.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
