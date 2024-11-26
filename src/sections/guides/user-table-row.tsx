import { useState, useCallback } from 'react';
// eslint-disable-next-line
import { doc, deleteDoc } from 'firebase/firestore';
// eslint-disable-next-line
import Swal from 'sweetalert2';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import { Rating, Typography } from '@mui/material';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { db } from '../../../firebase'; // Firebase config



// ----------------------------------------------------------------------

export type UserProps = {
  id: string;
  name: string;
  role: string;
  status: string;
  company: string;
  avatar: string;
  rating: any;
  isOnline: boolean;
  isVerified: boolean;
  phoneNumber: any;
  email: any;
  price: any;
};

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onDelete?: () => any;
};

export function UserTableRow({ row, selected, onSelectRow, onDelete = () => {} }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'guides', row.id)); 
      Swal.fire({
        title: 'Success!',
        text: 'Guide deleted successfully!',
        icon: 'success',
        confirmButtonText: 'Cool!'
      })
      onDelete();
    } catch (error) {
      console.error('Error deleting guide:', error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>


        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.name} src={row.avatar} />
            {row.name}
          </Box>
        </TableCell>

        <TableCell>{row.phoneNumber}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell align="left">
          <Typography
            variant="body2"
            fontWeight={700}
            color={row.price > 100 ? 'error.main' : 'success.main'}
          >
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(row.price)}
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Rating value={row.rating || 0} precision={0.5} readOnly />
        </TableCell>

        <TableCell align="center">
          {row.isVerified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={(!row.isOnline && 'error') || 'success'}>
            {row.isOnline ? 'online' : 'offline'}
          </Label>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClosePopover();
              handleDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
