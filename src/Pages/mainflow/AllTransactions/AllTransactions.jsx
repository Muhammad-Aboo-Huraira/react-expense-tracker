import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const AllTransactions = () => {
  const transactionsData = useSelector((state) => state.transactions.transactionsData);
console.log(transactionsData)
  return (
    <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
        All Transactions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {transactionsData.slice().reverse().map((transaction) => (
            <TableRow key={transaction.doc_id}>
              <TableCell>{transaction.account || '-'}</TableCell>
              <TableCell>{transaction.amount || '-'}</TableCell>
              <TableCell>{transaction.transactionType || '-'}</TableCell>
              <TableCell> {transaction.created_date || '-'}</TableCell>
              <TableCell>{transaction.category || '-'}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Container>
  )
}

export default AllTransactions
