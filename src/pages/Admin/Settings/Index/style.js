import { styled } from '@mui/system';

const headerNavHeight = '60px';

export const Container = styled('div')({
  margin: 'auto',
});

export const WrapperTabs = styled('div')({
  position: 'sticky',
  top: headerNavHeight,
  background: '#fff',
  paddingTop: '0.4rem',
  paddingBottom: '0.4rem',
  zIndex: 3,
});