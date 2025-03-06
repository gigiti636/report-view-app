import CloseIcon from '@mui/icons-material/Close';
import type { ModalProps } from '@mui/material/Modal';
import type { TransitionProps } from '@mui/material/transitions';
import type { SxProps, Theme } from '@mui/material/styles';
import { IconButton, Box, Fade, Modal, Backdrop } from '@mui/material';
import { MouseEventHandler, ReactNode } from 'react';
import ModalActionFooter from './ModalActionFooter';

interface ModalFooterControl {
  cancelActionLabel?: string;
  cancelAction?: () => void;
  callToActionLabel?: string;
  callToAction?: () => void;
  callToActionHidden?: boolean;
  callToActionIsDelete?: boolean;
  disabled?: boolean;
  sxFooter?: SxProps;
}

export interface TransitionsModalProps extends Omit<ModalProps, 'children'>, ModalFooterControl {
  TransitionProps?: TransitionProps;
  children: ReactNode;
  header?: ReactNode;
  maxWidth?: string;
  closeModal?: MouseEventHandler;
}

export default function TransitionsModal({
  open,
  header,
  children,
  maxWidth,
  closeModal,
  cancelActionLabel,
  cancelAction,
  callToActionLabel,
  callToAction,
  callToActionHidden = false,
  callToActionIsDelete = false,
  disabled,
  sxFooter,
  ...props
}: TransitionsModalProps) {
  const { TransitionProps = {}, ...otherProps } = props;

  const style: SxProps<Theme> = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: maxWidth ? maxWidth : '900px',
    width: '90%',
    maxHeight: '90%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: { xs: 2, md: 3 },
    overflow: 'auto',
    outline: 'none',
    borderRadius: '12px',
  };

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      open={open}
      {...otherProps}
    >
      <Fade in={open} {...TransitionProps}>
        <Box sx={style} display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} alignItems={'center'}>
            <Box flex={1}>
              {header && (
                <Box fontWeight={'bold'} fontSize={{ xs: '1.5rem', md: '2rem', lg: '2.25rem' }}>
                  {header}
                </Box>
              )}
            </Box>
            {closeModal && (
              <IconButton sx={{ cursor: 'pointer' }} onClick={closeModal}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          <Box>{children}</Box>
          {callToAction && (
            <ModalActionFooter
              action={callToActionLabel ?? 'Proceed'}
              cancelActionLabel={cancelActionLabel}
              callToAction={callToAction}
              callToActionHidden={callToActionHidden}
              cancelAction={cancelAction}
              callToActionIsDelete={callToActionIsDelete}
              disabled={disabled}
              sx={sxFooter}
            />
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
