import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: 'white',
    borderColor: 'black',
    color: 'black'
  },
});

export default function CustomizedButton() {
  return (
      <StyledButton className="StyledButton">Sass</StyledButton>
  );
}
