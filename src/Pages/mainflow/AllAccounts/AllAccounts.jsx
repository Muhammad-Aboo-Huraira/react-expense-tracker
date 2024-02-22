import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { dispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import { addAccounts } from '../../../redux/actions/accountsActions';

const AllAccounts = () => {
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('');
 const userId = useSelector(state => state.auth.user.uid)
 const isLoading = useSelector((state) => state.accounts.isLoading);
 const handleAccountNameChange = (event) => {
     setAccountName(event.target.value);
    };

    const handleAmountChange = (event) => {
        let value = event.target.value;
        if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= 9999999)) {
            setAmount(value);
        }
  };
  
  const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(addAccounts(accountName, amount, userId))
    setAccountName('');
    setAmount('');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Add Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Account Name"
          variant="outlined"
          value={accountName}
          onChange={handleAccountNameChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Amount"
          variant="outlined"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          fullWidth
          margin="normal"
          required
          InputProps={{ inputProps: { min: 0, max: 9999999 } }}
        />
        <Button type="submit" variant="contained" color="primary">
        {isLoading ? <CircularProgress size={24} /> : 'Add Account'}
        </Button>
      </form>
    </div>
  );
};

export default AllAccounts;
