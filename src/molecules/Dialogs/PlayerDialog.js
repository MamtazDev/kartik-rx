import React, {useCallback} from 'react';
import PropTypes from 'prop-types';

import IconButton from '../buttons/IconButton';
import CloseIcon from '../icons/CloseIcon';

import * as Style from './PlayerDialogStyles';

// import ReactHlsPlayer from 'react-hls-player';

const PlayerDialog = (props) => {
  const { isOpen, title, onClose, videoUrl } = props;
  // const videoUrl2 = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  // const videoUrl2 = "https://platolearn.net/assets/29_d9809eb3-b464-4c22-ab06-c3f3b47978b9/d9809eb3-b464-4c22-ab06-c3f3b47978b9.m3u8"
  // const playerRef = createRef();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Style.MyDialogPlayer
      open={isOpen}
      onClose={handleClose}
      maxWidth={false}
    >
      <Style.MyDialogTitlePlayer disableTypography>
        <Style.MyDialogTitleText>{title}</Style.MyDialogTitleText>
        <IconButton isDisplay={true} title='Close' onButtonClick={handleClose} size='large'>
          <CloseIcon iconSize='l' />
        </IconButton>
      </Style.MyDialogTitlePlayer>
      <Style.MyDialogContentPlayer>
        {/* <ReactHlsPlayer
          url={videoUrl}
          width='100%'
          height='100%'
          hlsConfig={{
              xhrSetup: function(xhr, url) {
                console.log(xhr, url);
                xhr.withCredentials = true; // send cookies
              },
          }}
        /> */}
        <Style.MyReactPlayer
          // ref={playerRef}
          width='100%'
          height='100%'
          url={videoUrl}
          controls
          config={{ 
            file: { 
              attributes: { controlsList: 'nodownload' }, 
              hlsOptions: {
                xhrSetup: function(xhr, url) {
                  xhr.withCredentials = true; // send cookies
                  // xhr.setRequestHeader("Access-Control-Allow-Headers","Content-Type, Accept, X-Requested-With");
                  // xhr.setRequestHeader("Access-Control-Allow-Origin","http://test.platolearn.net:3000");
                  // xhr.setRequestHeader("Access-Control-Allow-Credentials","true");
                  console.log(xhr, url);
                }
              }
            },
          }}
        />
      </Style.MyDialogContentPlayer>
    </Style.MyDialogPlayer>
  );
};

PlayerDialog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,

  title: PropTypes.string,
  videoUrl: PropTypes.string
};


export default PlayerDialog;