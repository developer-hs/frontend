import React, { useEffect } from 'react';

// NOTE: Use the editor from source (not a build)!
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import UploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import Link from '@ckeditor/ckeditor5-link/src/link';
import List from '@ckeditor/ckeditor5-list/src/list';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
import CSRFToken from '../../csrftoken';
import PostPresenter from './PostPresenter';
import { useSelector } from 'react-redux';
import api from '../../api';

export const editorConfiguration = {
  plugins: [
    // A set of editor features to be enabled and made available to the user.
    CKFinder,
    Highlight,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Heading,
    UploadAdapter,
    Autoformat,
    BlockQuote,
    Link,
    List,
    Alignment,
    EasyImage,
    Image,
    ImageCaption,
    ImageStyle,
    ImageToolbar,
    ImageUpload,
    ImageResize,

    // Your custom plugin implementing the widget is loaded here.
  ],
  highlight: {
    options: [
      {
        model: 'redPen',
        class: 'pen-red',
        title: 'Red pen',
        color: 'var(--ck-highlight-pen-red)',
        type: 'pen',
      },
      {
        model: 'greenPen',
        class: 'pen-green',
        title: 'Green pen',
        color: 'var(--ck-highlight-pen-green)',
        type: 'pen',
      },
      {
        model: 'yellowMarker',
        class: 'marker-yellow',
        title: 'Yellow marker',
        color: 'var(--ck-highlight-marker-yellow)',
        type: 'marker',
      },
      {
        model: 'greenMarker',
        class: 'marker-green',
        title: 'Green marker',
        color: 'var(--ck-highlight-marker-green)',
        type: 'marker',
      },
      {
        model: 'pinkMarker',
        class: 'marker-pink',
        title: 'Pink marker',
        color: 'var(--ck-highlight-marker-pink)',
        type: 'marker',
      },
      {
        model: 'blueMarker',
        class: 'marker-blue',
        title: 'Blue marker',
        color: 'var(--ck-highlight-marker-blue)',
        type: 'marker',
      },
    ],
  },
  toolbar: {
    items: [
      'heading',
      '|',
      'alignment',
      'bold',
      'italic',
      'highlight',
      'link',
      'bulletedList',
      'numberedList',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: [
      'imageStyle:alignLeft',
      'imageStyle:alignCenter',
      'imageStyle:alignRight',
      '|',
      'imageResize',
      '|',
      'imageTextAlternative',
    ],
    styles: ['alignLeft', 'alignCenter', 'alignRight'],
    resizeOptions: [
      {
        name: 'imageResize:original',
        label: 'Original',
        value: null,
      },
      {
        name: 'imageResize:50',
        label: '50%',
        value: '50',
      },
      {
        name: 'imageResize:75',
        label: '75%',
        value: '75',
      },
    ],
  },
  ckfinder: {
    uploadUrl: `http://127.0.0.1:8000/api/v1/posts/upload/image/`,
    headers: {
      'X-CSRF-TOKEN': CSRFToken(),
    },
  },
  heading: {
    options: [
      {
        model: 'heading1',
        view: 'h1',
        title: '헤더1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: '헤더2',
        class: 'ck-heading_heading2',
      },
      {
        model: 'heading3',
        view: 'h3',
        title: '헤더3',
        class: 'ck-heading_heading3',
      },
      { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
    ],
  },

  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

export default () => {
  const { token, isLoggedIn } = useSelector((state) => state.usersReducer);

  useEffect(() => {
    if (!isLoggedIn) {
      api.warningChangeUrl('http://localhost:3000/user/login/');
    }
  }, [isLoggedIn]);
  return (
    <PostPresenter
      editorConfiguration={editorConfiguration}
      token={token}
      isLoggedIn={isLoggedIn}
    />
  );
};
