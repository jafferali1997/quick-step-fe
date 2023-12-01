import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography
} from '@mui/material';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import useEmailSendModal from './use-send-email-modal';
import EmailInput from './component/email-input';

export default function SendEmailModal({ sendEmailModel, setSendEmailModel }) {
  const {
    handleSubmit,
    errors,
    onSubmit,
    register,
    editorRef,
    handleFileChange,
    attachedFiles,
    removeAttachedFile,
    setRecipientEmails,
    setBccEmails,
    recipientEmails,
    bccEmails
  } = useEmailSendModal({
    sendEmailModel,
    setSendEmailModel
  });

  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          width: '600px',
          borderRadius: '20px',
          display: 'flex'
        }
      }}
      open={sendEmailModel}
      onClose={() => setSendEmailModel(false)}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            background: '#E3ECF4',
            color: '#46474F',
            fontSize: '20px',
            fontWeight: '700',
            justifyContent: 'space-between'
          }}
        >
          <Box>Send Email</Box>
          <Box sx={{ cursor: 'pointer' }} onClick={() => setSendEmailModel(false)}>
            <CloseIcon fontSize="medium" />
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            p: 0
          }}
        >
          <EmailInput
            label="Recipient"
            bgcolor="#F2F6FD"
            name="recipient"
            register={register}
            error={errors.recipient}
            emails={recipientEmails}
            setEmails={setRecipientEmails}
          />
          <EmailInput
            label="BCC"
            name="BCC"
            bgcolor="#fff"
            register={register}
            error={errors.BCC}
            emails={bccEmails}
            setEmails={setBccEmails}
          />

          <TextField
            {...register('subject')}
            sx={{
              p: 1,
              '& .MuiInputBase-input': {
                fontSize: '14px'
              },
              color: '#A4A8AB',
              '& .MuiInput-underline:before, & .MuiInput-underline:hover:before, & .MuiInput-underline:after':
                {
                  content: 'none'
                }
            }}
            error={Boolean(errors.subject)}
            fullWidth
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    color: '#A4A8AB',
                    marginLeft: 0.8
                  }}
                >
                  <span style={{ fontSize: '14px' }}>Subject</span>
                </InputAdornment>
              )
            }}
            variant="standard"
          />

          <hr className="tw-mx-6" />
          {errors.subject && (
            <Typography sx={{ marginLeft: '23px', fontSize: '12px', color: 'red' }}>
              {errors.subject.message}
            </Typography>
          )}
          <Box
            className="no-border"
            sx={{
              height: '250',
              border: '7px',
              marginLeft: '7px',
              marginRight: '5.5px',
              marginTop: '6px'
            }}
          >
            <Editor
              init={{
                height: 260,
                menubar: false,
                placeholder: 'Message here',
                plugins: [
                  'advlist',
                  'autolink',
                  'lists',
                  'link',
                  'image',
                  'charmap',
                  'print',
                  'preview',
                  'anchor',
                  'searchreplace',
                  'visualblocks',
                  'code',
                  'fullscreen',
                  'insertdatetime',
                  'media',
                  'table',
                  'paste',
                  'help',
                  'wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic underline strikethrough | bullist numlist outdent indent',
                content_style:
                  'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
              }}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          {attachedFiles?.map((file, index) => (
            <Chip
              label={file.name}
              onDelete={() => removeAttachedFile(index)}
              variant="outlined"
              sx={{
                borderRadius: '0px',
                background: 'var(--default-color, #E4E4E4)',
                ml: '7px',
                overflow: 'hidden',
                width: '280x',
                mb: '6px'
              }}
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              ml: 2,
              mb: 3
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                bgcolor: '#1D4ED8 !important',
                textTransform: 'inherit',
                border: '4'
              }}
            >
              Send
            </Button>
            <input
              type="file"
              style={{ display: 'none', marginTop: '2px' }}
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.pdf,.doc,.png"
              multiple
            />
            <Button onClick={() => document.querySelector('input[type="file"]').click()}>
              <AttachFileIcon />
            </Button>
          </Box>
        </DialogActions>
      </form>
    </Dialog>
  );
}

SendEmailModal.propTypes = {
  sendEmailModel: PropTypes.bool,
  setSendEmailModel: PropTypes.func.isRequired
};
